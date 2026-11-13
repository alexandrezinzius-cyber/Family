-- Prix des bouteilles : date et origine de la dernière saisie (sans danger si déjà présentes)
alter table public.cellar_items add column if not exists price_source text;
alter table public.cellar_items add column if not exists price_updated_at timestamptz;
alter table public.cellar_items add column if not exists price_note text;
notify pgrst, 'reload schema';
