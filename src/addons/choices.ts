// Type pour les choix de prompts
export interface AddonChoice {
    title: string;
    value: string;
    description: string;
}

// Fonction pour obtenir les choix d'add-ons frontend selon le framework
export function getFrontendAddonsChoices(frontend: string): AddonChoice[] {
    const choices: AddonChoice[] = [];

    // Tailwind CSS - disponible pour tous
    choices.push({
        title: "🌊 Tailwind CSS",
        value: "tailwind",
        description: "Framework CSS utilitaire",
    });

    // Selon le framework
    if (frontend === "reactjs" || frontend === "nextjs") {
        choices.push(
            { title: "🎨 Shadcn/UI", value: "shadcn", description: "Composants UI élégants" },
            { title: "🔄 TanStack Query", value: "tanstack", description: "Gestion async des données" },
            { title: "📋 React Hook Form", value: "react-hook-form", description: "Formulaires performants" },
            { title: "✨ Framer Motion", value: "framer-motion", description: "Animations fluides" }
        );
    } else if (frontend === "solidjs") {
        choices.push(
            { title: "🔄 TanStack Query", value: "tanstack-solid", description: "Gestion async des données" },
            { title: "✨ Motion One", value: "motion-solid", description: "Animations pour Solid" }
        );
    } else if (frontend === "vuejs") {
        choices.push(
            { title: "🔄 TanStack Query", value: "tanstack-vue", description: "Gestion async des données" },
            { title: "🍍 Pinia", value: "pinia", description: "Store officiel Vue" },
            { title: "🧰 VueUse", value: "vue-use", description: "Utilitaires Composition API" }
        );
    }

    // Communs à tous
    choices.push(
        { title: "💎 Zod", value: "zod", description: "Validation TypeScript-first" },
        { title: "🌐 Axios", value: "axios", description: "Client HTTP" }
    );

    return choices;
}

// Fonction pour obtenir les choix d'add-ons backend selon le framework
export function getBackendAddonsChoices(backend: string): AddonChoice[] {
    const choices: AddonChoice[] = [];

    // Sécurité - disponible pour tous
    choices.push(
        { title: "🛡️ Helmet", value: "helmet", description: "Sécurité HTTP headers" },
        { title: "🔐 Bcrypt", value: "bcrypt", description: "Hachage mots de passe" },
        { title: "🔑 JsonWebToken", value: "jsonwebtoken", description: "Gestion JWT" }
    );

    // Selon le framework
    if (backend.includes("nestjs")) {
        choices.push(
            { title: "✅ Class Validator", value: "class-validator", description: "Validation par décorateurs" },
            { title: "📖 Swagger", value: "swagger", description: "Documentation API" }
        );
    } else if (backend.includes("express")) {
        choices.push(
            { title: "🔀 CORS", value: "cors", description: "Cross-Origin Resource Sharing" },
            { title: "⏱️  Rate Limiter", value: "rate-limiter", description: "Limitation des requêtes" },
            { title: "📖 Swagger", value: "swagger-express", description: "Documentation API" }
        );
    } else if (backend.includes("hono")) {
        choices.push(
            { title: "🔀 CORS", value: "cors", description: "Cross-Origin Resource Sharing" }
        );
    }

    // Communs
    choices.push(
        { title: "💎 Zod", value: "zod", description: "Validation de schémas" },
        { title: "📦 Compression", value: "compression", description: "Compression gzip" },
        { title: "⚙️  Dotenv", value: "dotenv", description: "Variables d'environnement" }
    );

    return choices;
}
