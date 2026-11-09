# Family Emilie, Alexandre, Hugo, Gaspard — version carnet illustré

## Installation
1. Décompresser l'archive et téléverser son contenu dans la racine du dépôt GitHub Pages.
2. IMPORTANT : conserver votre fichier `config.js` actuel (celui qui fonctionne), ou y remettre les deux valeurs Supabase sous la forme `window.APP_CONFIG={SUPABASE_URL:"…",SUPABASE_PUBLISHABLE_KEY:"…"};`.
3. Ne jamais publier une clé `service_role` ou `sb_secret_`.
4. Attendre la fin du déploiement puis recharger le site.

## Ce que cette version contient
- Nouvelle interface illustrée inspirée du visuel aquarelle fourni, navigation responsive.
- Connexion Supabase email/mot de passe (configuration existante conservée par l'utilisateur).
- Cave : fiches de bouteilles détaillées, catégories Vin/Champagne/Whisky/Rhum, quantités, prix, producteurs, région, millésime, accords, fenêtre de dégustation et plan de rangement Appartement/Extérieur de 7 × 4 places chacun.
- Cuisine : fiches recettes avec ingrédients, étapes, saison, portions, temps, équipement et lien source ; recherche et filtre.
- Menus : planning samedi-déjeuner à vendredi-dîner, portions, règles hiver et liste de courses séparée Marché/Supermarché ; génération simple d'ingrédients depuis les recettes associées.
- Cocktails, agenda local, liens Spotify et notes maison.

## Limites importantes
Les fiches sont enregistrées dans le stockage local du navigateur : elles ne se synchronisent PAS encore entre appareils et peuvent être perdues si les données du navigateur sont effacées. Supabase sert ici à l'authentification uniquement. Les API de cotations vin/spiritueux, actualisation de prix, import OCR/photo/URL automatisé, synchronisation Google Agenda et synchronisation des données familiales côté serveur ne sont pas encore développés. Ne stockez pas de données patrimoniales sensibles dans cette version.

L'application charge Supabase JS depuis jsDelivr et les polices depuis Google Fonts ; une connexion internet est nécessaire pour ces ressources. La mise en page reste utilisable sur navigateur mobile.
