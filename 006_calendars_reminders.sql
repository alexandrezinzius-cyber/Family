-- Calendriers importés, rappels et albums liés : à exécuter une fois dans Supabase > SQL Editor
create table if not exists public.family_calendars(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  name text not null, url text not null, color text, created_at timestamptz default now());
create table if not exists public.family_reminders(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text not null, due_date date, due_time text, notes text, repeat text default '',
  done boolean default false, done_at timestamptz, external_id text, source text default 'manuel', created_at timestamptz default now());
create table if not exists public.family_albums(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  name text not null, url text not null, kind text, created_at timestamptz default now());
do $$ declare t text; begin
  foreach t in array array['family_calendars','family_reminders','family_albums'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "family access" on public.%I', t);
    execute format('create policy "family access" on public.%I for all to authenticated using (family_id = public.my_family()) with check (family_id = public.my_family())', t);
    begin execute format('alter publication supabase_realtime add table public.%I', t); exception when duplicate_object then null; end;
  end loop;
end $$;
notify pgrst, 'reload schema';
