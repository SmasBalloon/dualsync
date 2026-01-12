# 🚀 DualSync - Roadmap & Ideas

## ✅ Fonctionnalités implémentées

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `dual new <name>` | Créer un nouveau projet fullstack |
| `dual doctor` | Vérifier si les outils nécessaires sont installés |
| `dual docker:dev` | Lancer l'environnement Docker de développement |
| `dual docker:stop` | Arrêter les conteneurs Docker |
| `dual docker:logs` | Afficher les logs des conteneurs |
| `dual make:module <name>` | Générer un module backend (controller, service, routes) |

---

## 📦 Templates GitHub - Organisation `dualSync-cli`

### Système de Presets

| Preset | Description |
|--------|-------------|
| **Minimal** | Framework de base uniquement (TypeScript, ESLint, Prettier) |
| **Standard** | Minimal + Tailwind CSS |
| **Full** | Standard + Add-ons populaires (Shadcn/Pinia, TanStack, Zod, Axios) |

---

## 🎨 Frontend Templates (15 repos)

### SolidJS

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/frontend-solidjs` | Minimal | Vite + SolidJS + TypeScript | 🔲 À créer |
| `dualSync-cli/frontend-solidjs-tailwind` | Standard | + Tailwind CSS | 🔲 À créer |
| `dualSync-cli/frontend-solidjs-full` | Full | + TanStack Query + Zod + Axios | 🔲 À créer |

### Next.js

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/frontend-nextjs` | Minimal | Next.js 14 + TypeScript | 🔲 À créer |
| `dualSync-cli/frontend-nextjs-tailwind` | Standard | + Tailwind CSS | 🔲 À créer |
| `dualSync-cli/frontend-nextjs-full` | Full | + Shadcn/UI + TanStack Query + Zod + Axios | 🔲 À créer |

### React (Vite)

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/frontend-reactjs` | Minimal | Vite + React + TypeScript | 🔲 À créer |
| `dualSync-cli/frontend-reactjs-tailwind` | Standard | + Tailwind CSS | 🔲 À créer |
| `dualSync-cli/frontend-reactjs-full` | Full | + Shadcn/UI + TanStack Query + React Hook Form + Zod + Axios | 🔲 À créer |

### Vue.js

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/frontend-vuejs` | Minimal | Vite + Vue 3 + TypeScript | 🔲 À créer |
| `dualSync-cli/frontend-vuejs-tailwind` | Standard | + Tailwind CSS | 🔲 À créer |
| `dualSync-cli/frontend-vuejs-full` | Full | + Pinia + VueUse + TanStack Query + Zod + Axios | 🔲 À créer |

### Angular

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/frontend-angularjs` | Minimal | Angular 17+ + TypeScript | 🔲 À créer |
| `dualSync-cli/frontend-angularjs-tailwind` | Standard | + Tailwind CSS | 🔲 À créer |
| `dualSync-cli/frontend-angularjs-full` | Full | + TanStack Query + Zod + Axios | 🔲 À créer |

---

## 🔧 Backend Templates (12 repos)

### NestJS

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-nestjs` | Minimal | NestJS + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-nestjs-full` | Full | + Swagger + class-validator + Helmet + JWT | 🔲 À créer |

### NestJS + Prisma

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-nestjs-prisma` | Minimal | NestJS + Prisma + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-nestjs-prisma-full` | Full | + Swagger + class-validator + Helmet + JWT | 🔲 À créer |

### Express

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-expressjs` | Minimal | Express + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-expressjs-full` | Full | + Swagger + Zod + Helmet + CORS + JWT + Bcrypt | 🔲 À créer |

### Express + Prisma

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-expressjs-prisma` | Minimal | Express + Prisma + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-expressjs-prisma-full` | Full | + Swagger + Zod + Helmet + CORS + JWT + Bcrypt | 🔲 À créer |

### Hono

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-hono` | Minimal | Hono + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-hono-full` | Full | + Zod + JWT | 🔲 À créer |

### Hono + Prisma

| Repo | Preset | Stack | Status |
|------|--------|-------|--------|
| `dualSync-cli/backend-hono-prisma` | Minimal | Hono + Prisma + TypeScript | 🔲 À créer |
| `dualSync-cli/backend-hono-prisma-full` | Full | + Zod + JWT | 🔲 À créer |

---

## 📊 Résumé

| Catégorie | Nombre de repos |
|-----------|-----------------|
| Frontend | 15 |
| Backend | 12 |
| **Total** | **27 repos** |

---

## 🔮 Idées futures

### 🖥️ `dual ui` - Interface web locale

**Description :** Lance une interface web sur `localhost:3000` pour configurer son projet visuellement.

**Fonctionnalités envisagées :**
- Dashboard pour visualiser la structure du projet
- Interface drag & drop pour ajouter des modules
- Générateur de CRUD visuel
- Prévisualisation des fichiers générés
- Configuration des variables d'environnement via formulaire
- Gestion des routes API
- Terminal intégré

**Complexité :** Élevée (plusieurs jours de développement)

---

### 📦 Autres idées

| Commande | Description | Priorité |
|----------|-------------|----------|
| `dual make:auth` | Générer un système d'authentification complet | Haute |
| `dual make:crud <name>` | Générer un CRUD complet (front + back) | Haute |
| `dual deploy` | Déployer sur Vercel/Railway/Fly.io | Moyenne |
| `dual db:migrate` | Lancer les migrations Prisma | Moyenne |
| `dual db:seed` | Lancer les seeds de la base de données | Moyenne |
| `dual test` | Lancer les tests front et back | Moyenne |
| `dual lint` | Lancer le linter sur tout le projet | Basse |
| `dual update` | Mettre à jour DualSync | Basse |

---

## 📝 Notes

- La version actuelle est `1.3.0`
- Le package est publié sur npm sous le nom `dualsync`
- La commande binaire est `dual`
- Organisation GitHub : `dualSync-cli`
