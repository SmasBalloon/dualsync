import pc from "picocolors";
import { execa } from "execa";

interface ToolCheck {
    name: string;
    command: string;
    args: string[];
    versionFlag?: string;
    required: boolean;
    installHint: string;
}

const TOOLS: ToolCheck[] = [
    {
        name: "Node.js",
        command: "node",
        args: ["--version"],
        required: true,
        installHint: "https://nodejs.org/",
    },
    {
        name: "npm",
        command: "npm",
        args: ["--version"],
        required: true,
        installHint: "Installé avec Node.js",
    },
    {
        name: "Git",
        command: "git",
        args: ["--version"],
        required: true,
        installHint: "https://git-scm.com/",
    },
    {
        name: "Docker",
        command: "docker",
        args: ["--version"],
        required: false,
        installHint: "https://www.docker.com/get-started/",
    },
    {
        name: "Docker Compose",
        command: "docker",
        args: ["compose", "version"],
        required: false,
        installHint: "Inclus avec Docker Desktop",
    },
    {
        name: "pnpm",
        command: "pnpm",
        args: ["--version"],
        required: false,
        installHint: "npm install -g pnpm",
    },
    {
        name: "yarn",
        command: "yarn",
        args: ["--version"],
        required: false,
        installHint: "npm install -g yarn",
    },
    {
        name: "bun",
        command: "bun",
        args: ["--version"],
        required: false,
        installHint: "https://bun.sh/",
    },
];

export async function doctorCommand(): Promise<void> {
    console.log(pc.cyan(pc.bold("\n🩺 DualSync Doctor - Vérification de l'environnement\n")));

    let allRequiredOk = true;
    const results: { name: string; status: "ok" | "missing" | "error"; version?: string; required: boolean; hint: string }[] = [];

    for (const tool of TOOLS) {
        try {
            const { stdout } = await execa(tool.command, tool.args);
            const version = stdout.trim().replace(/^v/, "").split("\n")[0];
            results.push({
                name: tool.name,
                status: "ok",
                version,
                required: tool.required,
                hint: tool.installHint,
            });
        } catch (error) {
            results.push({
                name: tool.name,
                status: "missing",
                required: tool.required,
                hint: tool.installHint,
            });
            if (tool.required) {
                allRequiredOk = false;
            }
        }
    }

    // Afficher les résultats
    console.log(pc.bold("  Outils requis :"));
    console.log(pc.dim("  ─────────────────────────────────────────────"));

    for (const result of results.filter(r => r.required)) {
        const icon = result.status === "ok" ? pc.green("✓") : pc.red("✗");
        const name = result.status === "ok" ? pc.green(result.name) : pc.red(result.name);
        const version = result.version ? pc.dim(` (${result.version})`) : "";
        console.log(`  ${icon} ${name}${version}`);
        if (result.status === "missing") {
            console.log(`    ${pc.dim("→")} ${pc.yellow(result.hint)}`);
        }
    }

    console.log(pc.bold("\n  Outils optionnels :"));
    console.log(pc.dim("  ─────────────────────────────────────────────"));

    for (const result of results.filter(r => !r.required)) {
        const icon = result.status === "ok" ? pc.green("✓") : pc.yellow("○");
        const name = result.status === "ok" ? pc.green(result.name) : pc.dim(result.name);
        const version = result.version ? pc.dim(` (${result.version})`) : "";
        console.log(`  ${icon} ${name}${version}`);
        if (result.status === "missing") {
            console.log(`    ${pc.dim("→")} ${pc.dim(result.hint)}`);
        }
    }

    console.log("");

    if (allRequiredOk) {
        console.log(pc.green(pc.bold("  ✨ Tout est prêt ! Tu peux utiliser DualSync.\n")));
    } else {
        console.log(pc.red(pc.bold("  ⚠️  Certains outils requis sont manquants.\n")));
        console.log(pc.yellow("  Installe-les avant d'utiliser DualSync.\n"));
        process.exit(1);
    }
}
