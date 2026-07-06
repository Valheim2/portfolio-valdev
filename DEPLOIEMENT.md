# Publier le portfolio gratuitement (Vercel + Turso)

Ce portfolio est une application **Next.js fullstack** : le formulaire de contact
et l'espace `/admin` écrivent dans une base de données. Pour un hébergement
gratuit, on utilise **Vercel** (hébergement) + **Turso** (base SQLite en ligne).

> Le fichier `prisma/dev.db` local ne peut PAS servir en production : le disque
> de Vercel est éphémère et en lecture seule. C'est pourquoi on branche Turso.

---

## 0. Préparer le code (déjà fait ✅)

Ces changements ont déjà été appliqués dans le projet :

- Logo Z AI retiré (`src/app/layout.tsx`).
- Prisma branché sur l'adaptateur libSQL (`src/lib/db.ts`, `prisma/schema.prisma`).
- Script `postinstall: prisma generate` ajouté (Vercel génère le client au build).
- `.env.example` mis à jour avec les variables Turso.

Il reste seulement à installer les 2 nouvelles dépendances :

```bash
npm install @prisma/adapter-libsql @libsql/client
```

---

## 1. Pousser le code sur GitHub

Ton `.gitignore` protège déjà `.env`, `node_modules` et `prisma/*.db` — tes
secrets et ta base locale ne partiront pas sur GitHub.

```bash
git init
git add .
git commit -m "Portfolio pret pour le deploiement"
```

> Sous Windows (cmd), ne colle pas de commentaire `# ...` en fin de ligne : il
> est interprété comme un argument et fait échouer la commande. Lance chaque
> ligne seule. Si git réclame ton identité au premier commit :
>
> ```bash
> git config --global user.email "empereurval0@gmail.com"
> git config --global user.name "Valheim"
> ```

Crée un dépôt sur https://github.com/new (par ex. `portfolio-valdev`), puis :

```bash
git remote add origin https://github.com/Valheim2/portfolio-valdev.git
git branch -M main
git push -u origin main
```

---

## 2. Créer la base Turso (gratuit)

1. Va sur https://turso.tech → crée un compte (connexion GitHub possible).
2. Installe la CLI Turso puis connecte-toi :

   ```bash
   # Windows (PowerShell) : voir https://docs.turso.tech/cli/installation
   turso auth login
   ```

3. Crée la base et récupère ses identifiants :

   ```bash
   turso db create portfolio-valdev
   turso db show portfolio-valdev --url        # → libsql://portfolio-valdev-xxxx.turso.io
   turso db tokens create portfolio-valdev     # → le TURSO_AUTH_TOKEN
   ```

Note les deux valeurs : l'**URL** (`libsql://…`) et le **token**.

---

## 3. Créer les tables dans Turso

Le schéma (tables `ContactMessage`, `User`, `Post`) doit être appliqué à Turso.
Génère le SQL depuis ton schéma Prisma et envoie-le à Turso :

```bash
# Génère le SQL de création des tables à partir de zéro
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > schema.sql

# Applique ce SQL sur la base Turso
turso db shell portfolio-valdev < schema.sql
```

Vérifie que les tables existent :

```bash
turso db shell portfolio-valdev ".tables"
```

---

## 4. Déployer sur Vercel

1. Va sur https://vercel.com → **Sign up** avec GitHub (plan **Hobby**, gratuit).
2. **Add New → Project** → importe ton dépôt `portfolio-valdev`.
3. Vercel détecte Next.js automatiquement — ne change rien au build.
4. Avant de cliquer **Deploy**, ouvre **Environment Variables** et ajoute :

   | Variable              | Valeur                                   |
   | --------------------- | ---------------------------------------- |
   | `TURSO_DATABASE_URL`  | l'URL `libsql://…` de l'étape 2          |
   | `TURSO_AUTH_TOKEN`    | le token de l'étape 2                    |
   | `DATABASE_URL`        | la même URL `libsql://…`                 |
   | `ADMIN_PASSWORD`      | un mot de passe fort pour `/admin`       |
   | `RESEND_API_KEY`      | (optionnel) clé Resend pour les emails   |
   | `CONTACT_EMAIL_TO`    | ton email de réception                   |
   | `CONTACT_EMAIL_FROM`  | `Portfolio <onboarding@resend.dev>`      |

5. Clique **Deploy**. Après ~1 minute, ton site est en ligne sur
   `https://portfolio-valdev.vercel.app`.

Chaque `git push` sur `main` redéploiera automatiquement le site.

---

## 5. Vérifier

- Ouvre l'URL Vercel → le portfolio s'affiche.
- Envoie un message via le formulaire de contact.
- Connecte-toi sur `/admin` avec ton `ADMIN_PASSWORD` → le message doit apparaître.

---

## Emails du formulaire (optionnel)

Le formulaire enregistre toujours les messages dans la base. Pour recevoir aussi
une **notification email**, crée une clé gratuite sur https://resend.com et
renseigne `RESEND_API_KEY` dans les variables Vercel. Sans clé, l'envoi d'email
est simplement ignoré (aucune erreur).

---

## Nom de domaine personnalisé (optionnel)

Le sous-domaine `.vercel.app` est gratuit et suffisant. Si tu veux un domaine
comme `claude-girardet.dev`, achète-le (~10 €/an) et ajoute-le dans
**Vercel → Settings → Domains**.
