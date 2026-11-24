-- Lecteur MP3 : à exécuter une fois dans Supabase > SQL Editor (les fichiers vont dans le stockage « photos », dossier music/)
create table if not exists public.family_tracks(
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null default public.my_family() references public.families(id) on delete cascade,
  title text not null, album text default 'Ma musique', url text not null, path text, size bigint,
  uploader text, created_at timestamptz default now());
alter table public.family_tracks enable row level security;
drop policy if exists "family access" on public.family_tracks;
create policy "family access" on public.family_tracks for all to authenticated
  using (family_id = public.my_family()) with check (family_id = public.my_family());
do $$ begin
  begin alter publication supabase_realtime add table public.family_tracks; exception when duplicate_object then null; end;
end $$;
notify pgrst, 'reload schema';
