# Family Emilie, Alexandre, Hugo & Gaspard — ZIP de démarrage

## Ce que contient cette base
- Interface familiale responsive, esprit carnet illustré.
- Connexion e-mail/mot de passe via Supabase Auth.
- Maquette de cave avec 28 emplacements par lieu (7 étagères × 4 cases), pour Appartement et Extérieur.
- Schéma SQL initial pour famille, profils, cave (dont champagne), recettes, menus, courses, agenda et playlists.
- Déploiement GitHub Pages via GitHub Actions.

**Ce n'est pas encore l'application complète.** Les écrans sont des bases visuelles ; les opérations métier (gestion des bouteilles, recettes, menus, courses), Google Agenda, OAuth Spotify, import de recettes par photo/site, OCR, estimations de valeur et droits administrateur avancés restent à programmer et tester. Spotify est actuellement un lien externe.

## 1 — Supabase
1. Crée un compte sur https://supabase.com/ puis clique **New project**.
2. Nomme le projet `family-emilie`, choisis une région européenne si disponible et un mot de passe de base de données robuste.
3. Dans **SQL Editor**, crée une requête, colle le contenu de `supabase/001_initial_schema.sql`, puis clique **Run**.
4. Dans **Authentication > Users**, clique **Add user** et crée ton compte avec ton e-mail et un mot de passe fort.
5. Dans SQL Editor, exécute : `insert into public.families(name) values ('Family Emilie, Alexandre, Hugo, Gaspard') returning id;` Copie l'UUID renvoyé.
6. Dans **Authentication > Users**, copie l'UUID de ton utilisateur. Exécute ensuite (en remplaçant les deux UUID) : `insert into public.profiles(id,family_id,display_name,role) values ('UUID_UTILISATEUR','UUID_FAMILLE','Alexandre','admin');`
7. Dans **Project Settings > API / API Keys**, copie l'URL du projet et la clé **Publishable** (`sb_publishable_...`) ou la clé `anon` publique pour un ancien projet.

## 2 — Configurer les clés publiques
Ouvre `config.js`. Remplace `https://TON-PROJET.supabase.co` par l'URL du projet, puis remplace `sb_publishable_TA_CLE_PUBLIQUE` par la clé Publishable/anon publique.
**Ne mets jamais** une clé `secret`, `service_role`, un mot de passe, ou un token Google/Spotify dans ce fichier ou dans GitHub.

## 3 — GitHub
1. Connecte-toi sur https://github.com/ et clique **New repository**. Nom : `family-emilie`.
2. Décompresse le ZIP sur ton appareil.
3. Dans le dépôt, clique **Add file > Upload files** et téléverse le contenu du dossier décompressé (pas le ZIP seul). Vérifie que `index.html`, `config.js`, `app.js`, `styles.css`, `supabase/` et `.github/` sont à la racine.
4. Clique **Commit changes** sur la branche `main`.
5. Va dans **Settings > Pages**. Dans **Build and deployment > Source**, choisis **GitHub Actions**.
6. Dans l'onglet **Actions**, attends que le workflow de déploiement soit terminé en vert.
7. Retourne dans **Settings > Pages** et clique **Visit site**.

## 4 — Déclarer l'adresse du site dans Supabase
Dans Supabase > **Authentication > URL Configuration**, renseigne l'adresse GitHub Pages dans **Site URL** et ajoute-la également à **Redirect URLs**.

## 5 — Créer les autres accès familiaux
Pour chaque compte, crée un utilisateur dans **Authentication > Users**. Ajoute ensuite une ligne dans `public.profiles` avec son UUID et le même `family_id`. N'accorde le rôle `admin` qu'à la personne qui doit administrer. Le contrôle des rôles et les écrans d'administration devront être complétés dans une prochaine version.

## Sécurité et compatibilité
GitHub Pages est un hébergement statique : le site publié est accessible à toute personne qui connaît son URL, même si le dépôt source est privé. N'y saisis pas de données sensibles ou patrimoniales dans ce prototype. Le SQL fourni est un squelette initial, à auditer et tester avec plusieurs comptes avant usage réel. Les clés publiques sont utilisables côté navigateur seulement avec des politiques RLS correctes. Configure les mots de passe, la confirmation d'e-mail et des sauvegardes.

L'iPad mini 2 sous iOS 12.5.2 est ancien : la compatibilité Safari et les fonctions tierces devront être vérifiées sur l'appareil.

Documentation officielle : https://supabase.com/docs · https://docs.github.com/en/pages
