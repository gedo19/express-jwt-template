import { Router } from 'express';

import usersController from './users.controller.js';
import { authenticateJwt } from '../../lib/passportStrategies/jwt/helper.js';
import userMiddleware from '../../middlewares/user.middleware.js';

const router = Router();

router.get('/', authenticateJwt, usersController.getAll);
router.get('/:userId', authenticateJwt, userMiddleware, usersController.getOne);

export default router;
