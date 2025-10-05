import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getProfile, updateProfile, validateUpdateProfile } from '../controllers/profilesController.js';

const router = Router();

router.get('/:id', getProfile);
router.put('/:id', auth, validateUpdateProfile, updateProfile);

export default router;
