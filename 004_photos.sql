-- Module Photos : à exécuter une fois dans Supabase > SQL Editor
create table if not exists public.family_photos(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  url text not null, thumb_url text, path text, thumb_path text,
  album text default 'Vrac', caption text, uploader text,
  taken_at timestamptz default now(), created_at timestamptz default now());
alter table public.family_photos enable row level security;
drop policy if exists "family access" on public.family_photos;
create policy "family access" on public.family_photos for all to authenticated
  using (family_id = public.my_family()) with check (family_id = public.my_family());
do $$ begin
  begin alter publication supabase_realtime add table public.family_photos; exception when duplicate_object then null; end;
end $$;
-- le stockage « photos » existe déjà (script 002)
notify pgrst, 'reload schema';
