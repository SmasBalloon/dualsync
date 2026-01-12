#!/usr/bin/env node

import { program } from "commander";
// @ts-ignore
import prompts from "prompts";
import pc from "picocolors";
import ora from "ora";
import { execa } from "execa";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_NAME = "smash-cli-front-back";
const CURRENT_VERSION = "1.0.5";

// Fonction pour vérifier les mises à jour
async function checkForUpdates() {
  try {
    const { stdout } = await execa("npm", ["view", PACKAGE_NAME, "version"]);
    const latestVersion = stdout.trim();
    
    if (latestVersion !== CURRENT_VERSION) {
      console.log(pc.yellow(`\n⚠️  Une nouvelle version est disponible : ${pc.bold(latestVersion)} (actuellement: ${CURRENT_VERSION})\n`));
      console.log(pc.cyan("Pour mettre à jour, utilisez l'une de ces commandes :"));
      console.log(pc.dim("  npm install -g smash-cli-front-back@latest"));
      console.log(pc.dim("  yarn global add smash-cli-front-back@latest"));
      console.log(pc.dim("  pnpm add -g smash-cli-front-back@latest"));
      console.log(pc.dim("  bun install -g smash-cli-front-back@latest\n"));
    }
  } catch (error) {
    // Ignorer les erreurs de vérification (offline, etc.)
  }
}

program
  .version(CURRENT_VERSION)
  .description("Ma CLI personnalisée pour mon duo de frameworks");

program
  .command("new <name>")
  .description("Créer un nouveau projet")
  .action(async (name: string) => {
    // Vérifier les mises à jour
    await checkForUpdates();
    
    console.log(
      pc.cyan(`\n🚀 Bienvenue dans l'assistant de création ${pc.bold(name)}\n`)
    );

    // 1. Questions avec prompts

    const answers = await prompts([
      {
        type: "select",
        name: "frontend",
        message: "Quel framework frontend veux-tu utiliser ?",
        choices: [
          { title: "⚡ SolidJS - Léger et réactif", value: "solidjs" },
          { title: "🚀 Next.js - Framework React complet", value: "nextjs" },
          { title: "⚛️ React - La librairie classique", value: "reactjs" },
          { title: "🖖 Vue.js - Le framework progressif", value: "vuejs" },
          { title: " Angular - Le framework robuste", value: "angularjs" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "backend",
        message: "Quel framework backend veux-tu utiliser ?",
        choices: [
          { title: "🏗️ NestJS - Framework complet", value: "nestjs" },
          { title: "🏗️ NestJS + Prisma - Avec ORM", value: "nestjs-prisma" },
          { title: "⚡ Express - Léger et flexible", value: "expressjs" },
          {
            title: "⚡ Express + Prisma - Express avec ORM",
            value: "expressjs-prisma",
          },
          { title: " hono - Ultra-léger pour serverless", value: "hono" },
          { title: " hono + Prisma - Hono avec ORM", value: "hono-prisma" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "database",
        message: "Quelle base de données veux-tu utiliser ?",
        choices: [
          { title: "🐬 MariaDB - MySQL compatible", value: "MariaDB" },
          { title: "🐘 PostgreSQL - Robuste et fiable", value: "PostgreSQL" },
          { title: "📄 SQLite - Léger et embarqué", value: "SQLite" },
          { title: "❌ Aucune - Pas de BD", value: "Aucune" },
        ],
        initial: 3,
      },
      {
        type: "select",
        name: "packageManager",
        message: "Quel gestionnaire de packages veux-tu utiliser ?",
        choices: [
          { title: "📦 npm - Le classique", value: "npm" },
          { title: "🧶 yarn - Rapide et fiable", value: "yarn" },
          { title: "📦 pnpm - Économe en espace", value: "pnpm" },
          { title: "⚡ bun - Ultra-rapide", value: "bun" },
          { title: "🦕 deno - Moderne et sécurisé", value: "deno" },
        ],
        initial: 0,
      },
    ]);

    const spinner = ora("Création des fichiers...").start();
    try {
      // 2. Créer le dossier principal
      fs.mkdirSync(name);
      // 3. Copier les dossiers frontend et backend
      // Le dossier templates est au même niveau que dist dans le package npm
      const templatesRoot = path.join(__dirname, "..", "templates");
      const frontendSource = path.join(
        templatesRoot,
        "frontend",
        answers.frontend
      );

      const backendSource = path.join(
        templatesRoot,
        "backend",
        answers.backend
      );

      const frontendDest = path.join(name, "frontend");
      const backendDest = path.join(name, "backend");
      copyDirectory(frontendSource, frontendDest);
      copyDirectory(backendSource, backendDest);

      // 4. Générer docker-compose.yml si une BD est sélectionnée
      if (answers.database !== "Aucune") {
        generateDockerCompose(name, answers.database);
      }
      // 5. Créer un fichier .gitignore pour le projet
      createRootGitIgnore(name);
      spinner.succeed(pc.green("Projet créé avec succès !"));

      // 6. Initialisation Git (optionnel)
      const gitPrompt = await prompts({
        type: "confirm",
        name: "initGit",
        message: "Initialiser un dépôt Git ?",
        initial: true,
      });
      if (gitPrompt.initGit) {
        const gitSpinner = ora("Initialisation de Git...").start();
        try {
          await execa("git", ["init"], { cwd: name });
          await execa("git", ["add", "."], { cwd: name });
          await execa("git", ["commit", "-m", "Initial commit"], { cwd: name });
          gitSpinner.succeed("Dépôt Git initialisé.");
        } catch (error) {
          gitSpinner.warn("Git non disponible ou erreur lors de l'initialisation.");
        }
      }

      // 7. Installation des dépendances (optionnel)
      const installPrompt = await prompts({
        type: "confirm",
        name: "install",
        message: "Installer les dépendances maintenant ?",
      });
      if (installPrompt.install) {
        const installSpinner = ora("Installation des packages...").start();
        try {
          const pm = answers.packageManager;
          const installCmd = getInstallCommand(pm);
          await execa(installCmd.cmd, installCmd.args, { cwd: path.join(name, "frontend") });
          await execa(installCmd.cmd, installCmd.args, { cwd: path.join(name, "backend") });
          installSpinner.succeed("Dépendances installées.");
        } catch (error) {
          installSpinner.fail("Erreur lors de l'installation des dépendances.");
        }
      }

      // 8. Afficher instructions finales
      console.log(pc.green("\n✨ Configuration:"));
      console.log(` Frontend: ${pc.cyan(answers.frontend)}`);
      console.log(` Backend: ${pc.cyan(answers.backend)}`);
      console.log(` Database: ${pc.cyan(answers.database)}`);
      console.log(` Package Manager: ${pc.cyan(answers.packageManager)}`);
      if (answers.database !== "Aucune") {
        console.log(`\n${pc.yellow("📦 Docker Compose détecté:")}`);
        console.log(` ${pc.dim("cd " + name + " && docker-compose up -d")}\n`);
      }

      const devCmd = getDevCommand(answers.packageManager);
      console.log(`\nMaintenant, fais:`);
      console.log(
        ` ${pc.yellow(`cd ${name}/frontend && ${devCmd}`)} ${pc.dim(
          "(terminal 1)"
        )}`
      );

      console.log(
        ` ${pc.yellow(`cd ${name}/backend && ${devCmd}`)} ${pc.dim(
          "(terminal 2)"
        )}\n`
      );
    } catch (error) {
      spinner.fail("Erreur lors de la création du projet.");
      console.error(error);
    }
  });

program.parse(process.argv);

// Fonction pour obtenir la commande d'installation selon le package manager
function getInstallCommand(pm: string): { cmd: string; args: string[] } {
  switch (pm) {
    case "yarn":
      return { cmd: "yarn", args: [] };
    case "pnpm":
      return { cmd: "pnpm", args: ["install"] };
    case "bun":
      return { cmd: "bun", args: ["install"] };
    case "deno":
      return { cmd: "deno", args: ["install"] };
    default:
      return { cmd: "npm", args: ["install"] };
  }
}

// Fonction pour obtenir la commande dev selon le package manager
function getDevCommand(pm: string): string {
  switch (pm) {
    case "yarn":
      return "yarn dev";
    case "pnpm":
      return "pnpm dev";
    case "bun":
      return "bun run dev";
    case "deno":
      return "deno task dev";
    default:
      return "npm run dev";
  }
}

// Fonction pour copier récursivement les dossiers

function copyDirectory(src: string, dest: string): void {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }

  fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src);

  files.forEach((file: string) => {
    const srcPath = path.join(src, file);

    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Fonction pour créer un .gitignore à la racine

function createRootGitIgnore(projectName: string): void {
  const gitIgnoreContent = `node_modules/

dist/

.env

.env.local

.DS_Store

*.log

`;

  fs.writeFileSync(path.join(projectName, ".gitignore"), gitIgnoreContent);
}

// Fonction pour générer docker-compose.yml

function generateDockerCompose(projectName: string, database: string): void {
  const dbConfigs: Record<string, any> = {
    PostgreSQL: {
      image: "postgres:15-alpine",

      port: 5432,

      env: {
        POSTGRES_USER: "user",

        POSTGRES_PASSWORD: "password",

        POSTGRES_DB: "my_database",
      },
    },

    MariaDB: {
      image: "mariadb:latest",

      port: 3306,

      env: {
        MARIADB_ROOT_PASSWORD: "root",

        MARIADB_DATABASE: "my_database",

        MARIADB_USER: "user",

        MARIADB_PASSWORD: "password",
      },
    },

    SQLite: null,
  };

  if (database === "SQLite" || database === "Aucune") {
    return;
  }

  const config = dbConfigs[database];

  if (!config) return;

  const dockerCompose = generateDockerComposeYaml(database, config);

  const filePath = path.join(projectName, "docker-compose.yml");

  fs.writeFileSync(filePath, dockerCompose);
}

// Fonction pour générer le contenu YAML

function generateDockerComposeYaml(database: string, config: any): string {
  const envVars = Object.entries(config.env)

    .map(([key, value]) => ` ${key}: ${value}`)

    .join("\n");

  if (database === "PostgreSQL") {
    return `version: '3.8'


services:

postgres:

image: ${config.image}

container_name: ${database.toLowerCase()}_container

ports:

- "${config.port}:5432"

environment:

${envVars}

volumes:

- postgres_data:/var/lib/postgresql/data

restart: unless-stopped

healthcheck:

test: ["CMD-SHELL", "pg_isready -U user"]

interval: 10s

timeout: 5s

retries: 5


volumes:

postgres_data:

`;
  } else if (database === "MariaDB") {
    return `version: '3.8'


services:

mariadb:

image: ${config.image}

container_name: ${database.toLowerCase()}_container

ports:

- "${config.port}:3306"

environment:

${envVars}

volumes:

- mariadb_data:/var/lib/mysql

restart: unless-stopped

healthcheck:

test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]

interval: 10s

timeout: 5s

retries: 5


volumes:

mariadb_data:

`;
  }

  return "";
}
