#!/usr/bin/env node

// Script post-installation pour afficher un message de bienvenue
// Utilise stderr pour éviter que npm supprime la sortie

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m",
    blue: "\x1b[34m",
};

const logo = `
${colors.cyan}${colors.bright}
    ____              __   _____                  
   / __ \\__  ______ _/ /  / ___/__  ______  _____
  / / / / / / / __ \`/ /   \\__ \\/ / / / __ \\/ ___/
 / /_/ / /_/ / /_/ / /   ___/ / /_/ / / / / /__  
/_____/\\__,_/\\__,_/_/   /____/\\__, /_/ /_/\\___/  
                             /____/              
${colors.reset}`;

const message = `
${logo}
  ${colors.green}${colors.bright}✨ DualSync installé avec succès !${colors.reset}

  ${colors.yellow}Commencez un nouveau projet :${colors.reset}
  ${colors.dim}$${colors.reset} ${colors.cyan}dual new mon-projet${colors.reset}

  ${colors.magenta}${colors.bright}Fonctionnalités :${colors.reset}
  ${colors.dim}•${colors.reset} 🎨 Frontend : SolidJS, Next.js, React, Vue, Angular
  ${colors.dim}•${colors.reset} 🔧 Backend : NestJS, Express, Hono (+ Prisma)
  ${colors.dim}•${colors.reset} 🗄️  Base de données : PostgreSQL, MariaDB, SQLite
  ${colors.dim}•${colors.reset} 🔐 .env auto-généré avec secrets sécurisés
  ${colors.dim}•${colors.reset} 🐳 Docker Compose pré-configuré
  ${colors.dim}•${colors.reset} 🧩 Add-ons : Tailwind, Shadcn/UI, Zod, JWT...

  ${colors.blue}Documentation : ${colors.dim}https://github.com/SmasBalloon/cli-conf-front-back${colors.reset}

`;

// Utiliser stderr pour que npm n'intercepte pas la sortie
process.stderr.write(message);
