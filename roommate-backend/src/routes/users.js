import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getMe, updateMe, validateUpdateMe } from '../controllers/usersController.js';

const router = Router();

router.get('/me', auth, getMe);
router.put('/me', auth, validateUpdateMe, updateMe);

export default router;
