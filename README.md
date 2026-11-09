# Family Emilie, Alexandre, Hugo & Gaspard — édition carnet illustré

Déploiement GitHub Pages : déposer le contenu de cette archive à la racine du dépôt, en conservant le fichier `config.js` déjà configuré.

## Configuration Supabase
Cette édition accepte les deux formats de configuration :
- `window.APP_CONFIG = { SUPABASE_URL: "…", SUPABASE_PUBLISHABLE_KEY: "…" }`
- `window.SUPABASE_URL = "…"; window.SUPABASE_ANON_KEY = "…";`

**Important :** ne remplacez pas votre `config.js` actuel si la connexion fonctionne déjà. Ne publiez jamais une clé `service_role` ou `sb_secret_`. Utilisez une clé publishable/anon et configurez correctement les politiques RLS dans Supabase.

## Contenu
Interface familiale responsive : tableau de bord, cave avec plan de rangement (2 lieux × 7 étagères × 4 emplacements), recettes, menus/courses, agenda, playlists et notes maison.

## Limites à connaître
Cette archive améliore principalement le design et la compatibilité de lecture de la configuration. Les données des modules sont encore enregistrées dans le stockage local du navigateur (elles ne sont donc pas synchronisées entre appareils). La synchronisation Supabase des données, Google Agenda bidirectionnel, import OCR de recettes et actualisation des cotations/prix ne sont pas implémentés dans cette version. L'espace maison/patrimoine est un espace de notes de démonstration : n'y stockez pas d'informations financières ou sensibles.
