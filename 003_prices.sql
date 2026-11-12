-- Prix des bouteilles : colonnes pour la source et la date de mise à jour (sans danger si déjà présentes)
alter table public.cellar_items add column if not exists price_source text;          -- 'vivino' ou 'manual'
alter table public.cellar_items add column if not exists price_updated_at timestamptz;
notify pgrst, 'reload schema';
