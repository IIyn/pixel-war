# Pixel War

Bienvenue dans le projet **Pixel War**, une application web collaborative inspirée du célèbre R/Place.

## Stack Technique

- **Framework** : [Next.js 15 (App Router)](https://nextjs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **ORM** : [Prisma](https://www.prisma.io/) avec adaptateur LibSQL
- **Base de données** : SQLite (via LibSQL)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Composants** : Radix UI / Lucide React

## 🛠️ Installation & Setup

Suivez ces étapes pour mettre en place le projet localement :

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd pixel-war
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet et ajoutez la variable suivante :

```env
DATABASE_URL="file:./dev.db"
```

### 4. Initialisation de la base de données (Prisma)
Générez le client Prisma et synchronisez le schéma avec votre base de données locale :

```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers la base de données SQLite
npx prisma db push
```

## 💻 Développement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du Projet

- `app/` : Routes et composants Next.js (App Router).
- `app/api/` : Points de terminaisons API pour la gestion des pixels.
- `lib/` : Utilitaires et singleton Prisma.
- `components/` : Composants UI réutilisables.
- `prisma/` : Schéma de la base de données et migrations.

