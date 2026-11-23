-- À exécuter une fois dans Supabase > SQL Editor si l'ajout d'une playlist affiche « could not find the owner column »
alter table public.playlists add column if not exists owner text default 'Famille';
notify pgrst, 'reload schema';
