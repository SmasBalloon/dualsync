import pc from "picocolors";
import ora from "ora";
import fs from "fs";
import path from "path";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ═══════════════════════════════════════════════════════════════
// NESTJS TEMPLATES
// ═══════════════════════════════════════════════════════════════

function getNestControllerTemplate(name: string, capitalizedName: string): string {
  return `import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ${capitalizedName}Service } from './${name}.service';
import { Create${capitalizedName}Dto } from './dto/create-${name}.dto';
import { Update${capitalizedName}Dto } from './dto/update-${name}.dto';

@Controller('${name}')
export class ${capitalizedName}Controller {
  constructor(private readonly ${name}Service: ${capitalizedName}Service) {}

  @Get()
  findAll() {
    return this.${name}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${name}Service.findOne(id);
  }

  @Post()
  create(@Body() create${capitalizedName}Dto: Create${capitalizedName}Dto) {
    return this.${name}Service.create(create${capitalizedName}Dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update${capitalizedName}Dto: Update${capitalizedName}Dto) {
    return this.${name}Service.update(id, update${capitalizedName}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${name}Service.remove(id);
  }
}
`;
}

function getNestServiceTemplate(name: string, capitalizedName: string): string {
  return `import { Injectable, NotFoundException } from '@nestjs/common';
import { Create${capitalizedName}Dto } from './dto/create-${name}.dto';
import { Update${capitalizedName}Dto } from './dto/update-${name}.dto';

@Injectable()
export class ${capitalizedName}Service {
  private ${name}s: any[] = [];

  findAll() {
    return this.${name}s;
  }

  findOne(id: string) {
    const ${name} = this.${name}s.find(item => item.id === id);
    if (!${name}) {
      throw new NotFoundException(\`${capitalizedName} with ID "\${id}" not found\`);
    }
    return ${name};
  }

  create(create${capitalizedName}Dto: Create${capitalizedName}Dto) {
    const new${capitalizedName} = {
      id: Date.now().toString(),
      ...create${capitalizedName}Dto,
    };
    this.${name}s.push(new${capitalizedName});
    return new${capitalizedName};
  }

  update(id: string, update${capitalizedName}Dto: Update${capitalizedName}Dto) {
    const index = this.${name}s.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(\`${capitalizedName} with ID "\${id}" not found\`);
    }
    this.${name}s[index] = { ...this.${name}s[index], ...update${capitalizedName}Dto };
    return this.${name}s[index];
  }

  remove(id: string) {
    const index = this.${name}s.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(\`${capitalizedName} with ID "\${id}" not found\`);
    }
    const removed = this.${name}s.splice(index, 1);
    return removed[0];
  }
}
`;
}

function getNestModuleTemplate(name: string, capitalizedName: string): string {
  return `import { Module } from '@nestjs/common';
import { ${capitalizedName}Controller } from './${name}.controller';
import { ${capitalizedName}Service } from './${name}.service';

@Module({
  controllers: [${capitalizedName}Controller],
  providers: [${capitalizedName}Service],
  exports: [${capitalizedName}Service],
})
export class ${capitalizedName}Module {}
`;
}

function getNestCreateDtoTemplate(name: string, capitalizedName: string): string {
  return `export class Create${capitalizedName}Dto {
  // Ajoute tes propriétés ici
  // Exemple:
  // @IsString()
  // @IsNotEmpty()
  // name: string;
}
`;
}

function getNestUpdateDtoTemplate(name: string, capitalizedName: string): string {
  return `import { PartialType } from '@nestjs/mapped-types';
import { Create${capitalizedName}Dto } from './create-${name}.dto';

export class Update${capitalizedName}Dto extends PartialType(Create${capitalizedName}Dto) {}
`;
}

// ═══════════════════════════════════════════════════════════════
// EXPRESS TEMPLATES
// ═══════════════════════════════════════════════════════════════

function getExpressControllerTemplate(name: string, capitalizedName: string): string {
  return `import { Request, Response, NextFunction } from 'express';

// In-memory storage (remplacer par une vraie DB)
let ${name}s: any[] = [];

// GET /${name}
export const getAll${capitalizedName}s = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: ${name}s });
  } catch (error) {
    next(error);
  }
};

// GET /${name}/:id
export const get${capitalizedName}ById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ${name} = ${name}s.find(item => item.id === id);
    if (!${name}) {
      return res.status(404).json({ error: '${capitalizedName} not found' });
    }
    res.json({ data: ${name} });
  } catch (error) {
    next(error);
  }
};

// POST /${name}
export const create${capitalizedName} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const new${capitalizedName} = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    ${name}s.push(new${capitalizedName});
    res.status(201).json({ data: new${capitalizedName} });
  } catch (error) {
    next(error);
  }
};

// PUT /${name}/:id
export const update${capitalizedName} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const index = ${name}s.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: '${capitalizedName} not found' });
    }
    ${name}s[index] = { ...${name}s[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ data: ${name}s[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /${name}/:id
export const delete${capitalizedName} = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const index = ${name}s.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: '${capitalizedName} not found' });
    }
    const deleted = ${name}s.splice(index, 1);
    res.json({ data: deleted[0], message: '${capitalizedName} deleted' });
  } catch (error) {
    next(error);
  }
};
`;
}

function getExpressRouteTemplate(name: string, capitalizedName: string): string {
  return `import { Router } from 'express';
import {
  getAll${capitalizedName}s,
  get${capitalizedName}ById,
  create${capitalizedName},
  update${capitalizedName},
  delete${capitalizedName},
} from './${name}.controller';

const router = Router();

/**
 * @route   GET /${name}
 * @desc    Get all ${name}s
 */
router.get('/', getAll${capitalizedName}s);

/**
 * @route   GET /${name}/:id
 * @desc    Get ${name} by ID
 */
router.get('/:id', get${capitalizedName}ById);

/**
 * @route   POST /${name}
 * @desc    Create a new ${name}
 */
router.post('/', create${capitalizedName});

/**
 * @route   PUT /${name}/:id
 * @desc    Update ${name} by ID
 */
router.put('/:id', update${capitalizedName});

/**
 * @route   DELETE /${name}/:id
 * @desc    Delete ${name} by ID
 */
router.delete('/:id', delete${capitalizedName});

export default router;
`;
}

// ═══════════════════════════════════════════════════════════════
// HONO TEMPLATES
// ═══════════════════════════════════════════════════════════════

function getHonoControllerTemplate(name: string, capitalizedName: string): string {
  return `import { Context } from 'hono';

// In-memory storage (remplacer par une vraie DB)
let ${name}s: any[] = [];

// GET /${name}
export const getAll${capitalizedName}s = async (c: Context) => {
  return c.json({ data: ${name}s });
};

// GET /${name}/:id
export const get${capitalizedName}ById = async (c: Context) => {
  const id = c.req.param('id');
  const ${name} = ${name}s.find(item => item.id === id);
  
  if (!${name}) {
    return c.json({ error: '${capitalizedName} not found' }, 404);
  }
  
  return c.json({ data: ${name} });
};

// POST /${name}
export const create${capitalizedName} = async (c: Context) => {
  const body = await c.req.json();
  
  const new${capitalizedName} = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  
  ${name}s.push(new${capitalizedName});
  return c.json({ data: new${capitalizedName} }, 201);
};

// PUT /${name}/:id
export const update${capitalizedName} = async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  
  const index = ${name}s.findIndex(item => item.id === id);
  
  if (index === -1) {
    return c.json({ error: '${capitalizedName} not found' }, 404);
  }
  
  ${name}s[index] = { 
    ...${name}s[index], 
    ...body, 
    updatedAt: new Date().toISOString() 
  };
  
  return c.json({ data: ${name}s[index] });
};

// DELETE /${name}/:id
export const delete${capitalizedName} = async (c: Context) => {
  const id = c.req.param('id');
  const index = ${name}s.findIndex(item => item.id === id);
  
  if (index === -1) {
    return c.json({ error: '${capitalizedName} not found' }, 404);
  }
  
  const deleted = ${name}s.splice(index, 1);
  return c.json({ data: deleted[0], message: '${capitalizedName} deleted' });
};
`;
}

function getHonoRouteTemplate(name: string, capitalizedName: string): string {
  return `import { Hono } from 'hono';
import {
  getAll${capitalizedName}s,
  get${capitalizedName}ById,
  create${capitalizedName},
  update${capitalizedName},
  delete${capitalizedName},
} from './${name}.controller';

const ${name}Routes = new Hono();

// GET /${name}
${name}Routes.get('/', getAll${capitalizedName}s);

// GET /${name}/:id
${name}Routes.get('/:id', get${capitalizedName}ById);

// POST /${name}
${name}Routes.post('/', create${capitalizedName});

// PUT /${name}/:id
${name}Routes.put('/:id', update${capitalizedName});

// DELETE /${name}/:id
${name}Routes.delete('/:id', delete${capitalizedName});

export default ${name}Routes;
`;
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMMAND
// ═══════════════════════════════════════════════════════════════

export async function makeModuleCommand(name: string): Promise<void> {
  console.log(pc.cyan(pc.bold(`\n🔧 Génération du module "${name}"...\n`)));

  const moduleName = name.toLowerCase();
  const capitalizedName = capitalize(moduleName);

  // Détecter le type de backend
  const backendPath = path.join(process.cwd(), "backend");
  const srcPath = path.join(backendPath, "src");

  if (!fs.existsSync(backendPath)) {
    console.log(pc.red("  ❌ Dossier 'backend' non trouvé."));
    console.log(pc.dim("  Assure-toi d'être à la racine d'un projet DualSync.\n"));
    process.exit(1);
  }

  // Détecter le framework backend
  const packageJsonPath = path.join(backendPath, "package.json");
  let backendType: "nestjs" | "express" | "hono" = "express";

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    if (deps["@nestjs/core"]) {
      backendType = "nestjs";
    } else if (deps["hono"]) {
      backendType = "hono";
    } else if (deps["express"]) {
      backendType = "express";
    }
  }

  const frameworkEmoji = {
    nestjs: "🐱",
    express: "⚡",
    hono: "🔥",
  };

  const spinner = ora(`Création du module ${moduleName} (${frameworkEmoji[backendType]} ${backendType})...`).start();

  try {
    const modulePath = path.join(srcPath, moduleName);
    fs.mkdirSync(modulePath, { recursive: true });

    if (backendType === "nestjs") {
      // ─────────────────────────────────────────────────────────────
      // NESTJS
      // ─────────────────────────────────────────────────────────────
      const dtoPath = path.join(modulePath, "dto");
      fs.mkdirSync(dtoPath, { recursive: true });

      fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.ts`), getNestControllerTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(modulePath, `${moduleName}.service.ts`), getNestServiceTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(modulePath, `${moduleName}.module.ts`), getNestModuleTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(dtoPath, `create-${moduleName}.dto.ts`), getNestCreateDtoTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(dtoPath, `update-${moduleName}.dto.ts`), getNestUpdateDtoTemplate(moduleName, capitalizedName));

      spinner.succeed(pc.green(`Module ${moduleName} créé ! ${frameworkEmoji[backendType]}`));

      console.log(pc.cyan("\n  📁 Fichiers créés :"));
      console.log(pc.dim("  ─────────────────────────────────────────────"));
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.controller.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.service.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.module.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/dto/create-${moduleName}.dto.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/dto/update-${moduleName}.dto.ts`);

      console.log(pc.yellow("\n  ⚠️  N'oublie pas d'importer le module dans app.module.ts :"));
      console.log(pc.dim(`  import { ${capitalizedName}Module } from './${moduleName}/${moduleName}.module';`));
      console.log(pc.dim(`  @Module({ imports: [..., ${capitalizedName}Module] })\n`));

    } else if (backendType === "express") {
      // ─────────────────────────────────────────────────────────────
      // EXPRESS
      // ─────────────────────────────────────────────────────────────
      fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.ts`), getExpressControllerTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(modulePath, `${moduleName}.routes.ts`), getExpressRouteTemplate(moduleName, capitalizedName));

      spinner.succeed(pc.green(`Module ${moduleName} créé ! ${frameworkEmoji[backendType]}`));

      console.log(pc.cyan("\n  📁 Fichiers créés :"));
      console.log(pc.dim("  ─────────────────────────────────────────────"));
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.controller.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.routes.ts`);

      console.log(pc.yellow("\n  ⚠️  N'oublie pas d'ajouter les routes dans ton app :"));
      console.log(pc.dim(`  import ${moduleName}Routes from './${moduleName}/${moduleName}.routes';`));
      console.log(pc.dim(`  app.use('/${moduleName}', ${moduleName}Routes);\n`));

    } else if (backendType === "hono") {
      // ─────────────────────────────────────────────────────────────
      // HONO
      // ─────────────────────────────────────────────────────────────
      fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.ts`), getHonoControllerTemplate(moduleName, capitalizedName));
      fs.writeFileSync(path.join(modulePath, `${moduleName}.routes.ts`), getHonoRouteTemplate(moduleName, capitalizedName));

      spinner.succeed(pc.green(`Module ${moduleName} créé ! ${frameworkEmoji[backendType]}`));

      console.log(pc.cyan("\n  📁 Fichiers créés :"));
      console.log(pc.dim("  ─────────────────────────────────────────────"));
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.controller.ts`);
      console.log(`  ${pc.dim("•")} backend/src/${moduleName}/${moduleName}.routes.ts`);

      console.log(pc.yellow("\n  ⚠️  N'oublie pas d'ajouter les routes dans ton app :"));
      console.log(pc.dim(`  import ${moduleName}Routes from './${moduleName}/${moduleName}.routes';`));
      console.log(pc.dim(`  app.route('/${moduleName}', ${moduleName}Routes);\n`));
    }

  } catch (error) {
    spinner.fail(pc.red("Erreur lors de la création du module."));
    console.error(pc.dim(String(error)));
    process.exit(1);
  }
}
