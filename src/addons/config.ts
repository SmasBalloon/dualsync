// Types pour les add-ons
export interface AddonConfig {
    name: string;
    packages: string[];
    devPackages?: string[];
    description: string;
}

// Configuration des add-ons frontend
export const FRONTEND_ADDONS: Record<string, AddonConfig> = {
    tailwind: {
        name: "Tailwind CSS",
        packages: [],
        devPackages: ["tailwindcss", "postcss", "autoprefixer"],
        description: "Framework CSS utilitaire",
    },
    shadcn: {
        name: "Shadcn/UI",
        packages: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
        devPackages: ["tailwindcss", "postcss", "autoprefixer"],
        description: "Composants UI réutilisables (nécessite React)",
    },
    tanstack: {
        name: "TanStack Query",
        packages: ["@tanstack/react-query"],
        description: "Gestion asynchrone des données",
    },
    "tanstack-solid": {
        name: "TanStack Query",
        packages: ["@tanstack/solid-query"],
        description: "Gestion asynchrone des données pour Solid",
    },
    "tanstack-vue": {
        name: "TanStack Query",
        packages: ["@tanstack/vue-query"],
        description: "Gestion asynchrone des données pour Vue",
    },
    zod: {
        name: "Zod",
        packages: ["zod"],
        description: "Validation de schémas TypeScript-first",
    },
    "react-hook-form": {
        name: "React Hook Form",
        packages: ["react-hook-form", "@hookform/resolvers"],
        description: "Gestion de formulaires performante",
    },
    "framer-motion": {
        name: "Framer Motion",
        packages: ["framer-motion"],
        description: "Animations fluides pour React",
    },
    "motion-solid": {
        name: "Solid Motion",
        packages: ["@motionone/solid"],
        description: "Animations pour SolidJS",
    },
    axios: {
        name: "Axios",
        packages: ["axios"],
        description: "Client HTTP populaire",
    },
    "vue-use": {
        name: "VueUse",
        packages: ["@vueuse/core"],
        description: "Collection d'utilitaires Vue Composition API",
    },
    pinia: {
        name: "Pinia",
        packages: ["pinia"],
        description: "Store officiel pour Vue.js",
    },
};

// Configuration des add-ons backend
export const BACKEND_ADDONS: Record<string, AddonConfig> = {
    zod: {
        name: "Zod",
        packages: ["zod"],
        description: "Validation de schémas",
    },
    "class-validator": {
        name: "Class Validator",
        packages: ["class-validator", "class-transformer"],
        description: "Validation par décorateurs (idéal NestJS)",
    },
    helmet: {
        name: "Helmet",
        packages: ["helmet"],
        description: "Sécurité HTTP headers",
    },
    cors: {
        name: "CORS",
        packages: ["cors"],
        devPackages: ["@types/cors"],
        description: "Cross-Origin Resource Sharing",
    },
    "rate-limiter": {
        name: "Rate Limiter",
        packages: ["express-rate-limit"],
        description: "Limitation du débit des requêtes",
    },
    compression: {
        name: "Compression",
        packages: ["compression"],
        devPackages: ["@types/compression"],
        description: "Compression gzip/deflate",
    },
    swagger: {
        name: "Swagger/OpenAPI",
        packages: ["@nestjs/swagger", "swagger-ui-express"],
        description: "Documentation API (NestJS)",
    },
    "swagger-express": {
        name: "Swagger/OpenAPI",
        packages: ["swagger-jsdoc", "swagger-ui-express"],
        devPackages: ["@types/swagger-jsdoc", "@types/swagger-ui-express"],
        description: "Documentation API (Express)",
    },
    bcrypt: {
        name: "Bcrypt",
        packages: ["bcrypt"],
        devPackages: ["@types/bcrypt"],
        description: "Hachage de mots de passe",
    },
    jsonwebtoken: {
        name: "JsonWebToken",
        packages: ["jsonwebtoken"],
        devPackages: ["@types/jsonwebtoken"],
        description: "Gestion des JWT",
    },
    dotenv: {
        name: "Dotenv",
        packages: ["dotenv"],
        description: "Chargement des variables d'environnement",
    },
};
