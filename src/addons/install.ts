import path from "path";
import { execa } from "execa";
import { FRONTEND_ADDONS, BACKEND_ADDONS } from "./config.js";
import { getAddPackageCommand } from "../utils/commands.js";

// Fonction pour installer les add-ons sélectionnés
export async function installAddons(
    projectPath: string,
    target: "frontend" | "backend",
    addons: string[],
    packageManager: string
): Promise<void> {
    if (!addons || addons.length === 0) return;

    const addonsConfig = target === "frontend" ? FRONTEND_ADDONS : BACKEND_ADDONS;
    const targetPath = path.join(projectPath, target);

    const allPackages: string[] = [];
    const allDevPackages: string[] = [];

    for (const addonKey of addons) {
        const addon = addonsConfig[addonKey];
        if (addon) {
            if (addon.packages) allPackages.push(...addon.packages);
            if (addon.devPackages) allDevPackages.push(...addon.devPackages);
        }
    }

    // Installer les packages de production
    if (allPackages.length > 0) {
        const cmd = getAddPackageCommand(packageManager, allPackages, false);
        await execa(cmd.cmd, cmd.args, { cwd: targetPath });
    }

    // Installer les packages de développement
    if (allDevPackages.length > 0) {
        const cmd = getAddPackageCommand(packageManager, allDevPackages, true);
        await execa(cmd.cmd, cmd.args, { cwd: targetPath });
    }
}
