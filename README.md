# Family — Emilie, Alexandre, Hugo & Gaspard

Site familial (GitHub Pages + Supabase) : cave, recettes, menus & courses, agenda, playlists, notes.
Toutes les données sont **synchronisées automatiquement** entre vos appareils (Supabase temps réel).

## Mise en place (une seule fois)
1. **Supabase → SQL Editor** : collez le contenu de `supabase/002_family_sync.sql` puis *Run*. Le script peut être relancé sans perdre de données. Il rattache tous vos comptes existants à la famille.
2. **Supabase → Authentication → Sign In / Providers** : désactivez *Allow new users to sign up* (vos comptes existent déjà, personne d'autre ne doit pouvoir s'inscrire).
3. **GitHub** : déposez le contenu de cette archive à la racine du dépôt. **Gardez votre `config.js` actuel** (celui qui contient votre vraie URL et clé publique). `config.example.js` n'est qu'un modèle. Ne mettez jamais de clé `service_role` / `sb_secret_`.
4. Ouvrez le site, connectez-vous, puis :
   - **Cave** → bouton *Importer ma cave Vivino* (36 lignes : 28 bouteilles dans la cave à vin, 2 « à placer », le reste en placard).
   - **Recettes** → bouton *Importer mes recettes* (81 recettes MyRecipeBox avec photos).
   Les boutons disparaissent une fois les données importées ; ré-importer ne crée pas de doublons.
5. Sur iPad/iPhone : Safari → Partager → *Sur l'écran d'accueil*.

## Fonctions
- **Cave** : cave à vin illustrée (28 emplacements, étagères 1–7), placards (sans position précise), extérieur (avec annotation de position). Fiche détaillée, photo, valeur, accords, « idée de plat » et « idée de cocktail » selon la bouteille.
- **Recettes** : carnet, recherche, favoris, notes, planification, ajout aux courses ; **idées depuis internet** (TheMealDB) et **cocktails** avec/sans alcool (TheCocktailDB), traduits en français automatiquement ; bouton « Ajouter à mes recettes ».
- **Menus** : semaine du samedi au vendredi. Bouton **✨ Proposer les menus** (le vendredi, un bandeau le rappelle) : dîners pour 3, soupe dimanche + lundi de novembre à mars, déjeuners de week-end, évite les plats des 3 dernières semaines, option « 2 idées internet ». Validation → menus + liste de courses.
- **Agenda, playlists, notes** synchronisés.

## Limites connues
- Les idées internet viennent de TheMealDB/TheCocktailDB (catalogue surtout anglo-saxon). La traduction utilise un service gratuit non officiel : si elle est indisponible, le texte reste en anglais.
- Google Agenda et l'actualisation automatique des cotations de vins ne sont pas encore branchés.
- L'import du calendrier et de la liste de courses du fichier MyRecipeBox n'est pas fait (anciens repas de 2021–2025).
