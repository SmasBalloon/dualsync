import { Router } from 'express';
import { indexController } from '../controllers/index.controller.js';

const router = Router();

// GET / - Welcome message
router.get('/', indexController.getWelcome.bind(indexController));

// GET /health - Health check
router.get('/health', indexController.getHealthCheck.bind(indexController));

export default router;
