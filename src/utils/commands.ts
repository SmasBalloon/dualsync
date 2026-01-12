// Fonction pour obtenir la commande d'installation selon le package manager
export function getInstallCommand(pm: string): { cmd: string; args: string[] } {
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

// Fonction pour obtenir la commande d'ajout de package selon le package manager
export function getAddPackageCommand(pm: string, packages: string[], isDev: boolean = false): { cmd: string; args: string[] } {
    switch (pm) {
        case "yarn":
            return { cmd: "yarn", args: ["add", ...(isDev ? ["-D"] : []), ...packages] };
        case "pnpm":
            return { cmd: "pnpm", args: ["add", ...(isDev ? ["-D"] : []), ...packages] };
        case "bun":
            return { cmd: "bun", args: ["add", ...(isDev ? ["-d"] : []), ...packages] };
        case "deno":
            return { cmd: "deno", args: ["add", ...packages] };
        default:
            return { cmd: "npm", args: ["install", ...(isDev ? ["-D"] : []), ...packages] };
    }
}

// Fonction pour obtenir la commande dev selon le package manager
export function getDevCommand(pm: string): string {
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
