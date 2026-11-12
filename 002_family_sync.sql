-- =====================================================================
-- Family — synchronisation multi-appareils
-- À coller en une fois dans Supabase > SQL Editor > Run.
-- Peut être relancé sans danger : les données existantes sont conservées
-- (seules les anciennes tables vides de la v1 "cellar_bottles" et
--  l'ancienne forme de "recipes" sont remplacées).
-- =====================================================================
create extension if not exists pgcrypto;

-- 0. Remplacement des anciennes tables d'une version précédente (structure différente)
--    Une table n'est remplacée que si elle est VIDE ; sinon le script s'arrête avec un message clair.
do $$
declare r record; n bigint;
begin
  for r in select * from (values
      ('meal_plans','meal_type'), ('recipes','total_minutes'), ('shopping_items','name'),
      ('family_events','title'), ('playlists','spotify_url'), ('family_notes','body'), ('cellar_items','slot')
    ) as v(tbl, marker)
  loop
    if exists (select 1 from information_schema.tables where table_schema='public' and table_name=r.tbl)
       and not exists (select 1 from information_schema.columns where table_schema='public' and table_name=r.tbl and column_name=r.marker) then
      execute format('select count(*) from public.%I', r.tbl) into n;
      if n = 0 then execute format('drop table public.%I cascade', r.tbl);
      else raise exception 'La table % contient des donnees avec une ancienne structure : ne rien supprimer, contactez-moi.', r.tbl;
      end if;
    end if;
  end loop;
  -- tables recettes/menus : on vérifie aussi l'ordre de dépendance
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='meal_plans')
     and not exists (select 1 from information_schema.tables where table_schema='public' and table_name='recipes') then
    drop table public.meal_plans cascade;
  end if;
  drop table if exists public.cellar_bottles cascade;
end $$;

-- 1. Famille & profils
create table if not exists public.families(
  id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now());
create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  family_id uuid references public.families(id) on delete set null,
  display_name text not null default '', role text not null default 'member');

-- une seule famille : celle-ci
insert into public.families(name) select 'Family' where not exists (select 1 from public.families);

-- rattache tous les comptes existants à la famille
insert into public.profiles(id, family_id, display_name)
select u.id, (select id from public.families order by created_at limit 1), split_part(u.email,'@',1)
from auth.users u
on conflict (id) do update set family_id = coalesce(public.profiles.family_id, excluded.family_id);

-- tout nouveau compte rejoint automatiquement la famille
-- (pensez à désactiver "Allow new users to sign up" dans Authentication > Sign In / Providers)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id, family_id, display_name)
  values (new.id, (select id from public.families order by created_at limit 1), split_part(new.email,'@',1))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.my_family() returns uuid
language sql stable security definer set search_path=public as $$
  select family_id from public.profiles where id = auth.uid() $$;

-- 2. Tables
create table if not exists public.cellar_items(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  name text not null, producer text, cuvee text, vintage int, country text, region text,
  wine_type text default 'Rouge',            -- Rouge, Blanc, Rosé, Effervescent, Liquoreux, Fortifié, Spiritueux
  category text default 'Vin',               -- Vin, Champagne, Crémant, Whisky, Rhum, Gin...
  bottle_size text default '75 cl', quantity int not null default 1,
  purchase_price numeric(12,2), estimated_value numeric(12,2), acquired_on date,
  drinking_window text, serving_temperature text, food_pairing text, notes text,
  vivino_url text, photo_url text,
  location_kind text not null default 'cave' check (location_kind in ('cave','placard','exterieur')),
  slot int check (slot between 1 and 28),    -- emplacement dans la cave à vin (28 bouteilles)
  place_label text,                          -- placard / lieu extérieur
  position_note text,                        -- annotation de position précise
  external_id text, created_at timestamptz default now(),
  unique (family_id, external_id));
create unique index if not exists cellar_slot_unique on public.cellar_items(family_id, slot)
  where location_kind='cave' and slot is not null;

create table if not exists public.recipes(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text not null, category text default 'Plat', description text,
  ingredients text, instructions text, nutrition text, notes text,
  servings int, prep_minutes int, cook_minutes int, total_minutes int,
  source_url text, photo_url text, favorite boolean default false, rating int default 0,
  external_id text, created_at timestamptz default now(),
  unique (family_id, external_id));

create table if not exists public.meal_plans(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  meal_date date not null, meal_type text not null default 'soir',   -- 'midi' | 'soir'
  recipe_id uuid references public.recipes(id) on delete set null,
  title text, servings int default 3);

create table if not exists public.shopping_items(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  name text not null, quantity text, shop text default 'Supermarché', checked boolean default false);

create table if not exists public.family_events(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text not null, starts_at timestamptz, ends_at timestamptz, owner text default 'Famille',
  google_event_id text);

create table if not exists public.playlists(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text not null, spotify_url text not null, owner text default 'Famille');

create table if not exists public.family_notes(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text, body text, created_at timestamptz default now());

-- colonnes ajoutées à des tables déjà existantes (idempotent)
alter table public.shopping_items add column if not exists recipe_title text;
alter table public.shopping_items add column if not exists created_at timestamptz default now();
alter table public.family_events  add column if not exists notes text;
alter table public.family_events  add column if not exists all_day boolean default false;
alter table public.meal_plans     add column if not exists notes text;
-- valeur par défaut du family_id sur les tables déjà existantes
alter table public.shopping_items alter column family_id set default public.my_family();
alter table public.family_events  alter column family_id set default public.my_family();
alter table public.playlists      alter column family_id set default public.my_family();
alter table public.family_notes   alter column family_id set default public.my_family();

-- 3. Sécurité : chaque membre ne voit/modifie que les données de SA famille
do $$ declare t text; begin
  foreach t in array array['families','profiles','cellar_items','recipes','meal_plans',
                           'shopping_items','family_events','playlists','family_notes'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
  foreach t in array array['cellar_items','recipes','meal_plans','shopping_items',
                           'family_events','playlists','family_notes'] loop
    execute format('drop policy if exists "family access" on public.%I', t);
    execute format('create policy "family access" on public.%I for all to authenticated
                    using (family_id = public.my_family()) with check (family_id = public.my_family())', t);
  end loop;
end $$;

drop policy if exists "profile self read" on public.profiles;
create policy "profile self read" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "family read" on public.families;
create policy "family read" on public.families for select to authenticated using (id = public.my_family());

-- 4. Synchronisation temps réel entre appareils
do $$ declare t text; begin
  foreach t in array array['cellar_items','recipes','meal_plans','shopping_items',
                           'family_events','playlists','family_notes'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

-- 5. Stockage des photos (bouteilles, recettes)
insert into storage.buckets(id, name, public) values ('photos','photos',true) on conflict (id) do nothing;
drop policy if exists "photos read"   on storage.objects;
drop policy if exists "photos write"  on storage.objects;
drop policy if exists "photos delete" on storage.objects;
create policy "photos read"   on storage.objects for select using (bucket_id='photos');
create policy "photos write"  on storage.objects for insert to authenticated with check (bucket_id='photos');
create policy "photos delete" on storage.objects for delete to authenticated using (bucket_id='photos');

-- 6. Rafraîchit le cache de l'API (évite l'erreur « column not found in the schema cache »)
notify pgrst, 'reload schema';
