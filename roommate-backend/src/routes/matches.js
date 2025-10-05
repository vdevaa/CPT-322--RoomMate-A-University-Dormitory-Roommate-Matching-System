import { Router } from 'express';
import auth from '../middleware/auth.js';
import { recommendations, likeUser } from '../controllers/matchesController.js';

const router = Router();

router.get('/recommendations', auth, recommendations);
router.post('/like/:userId', auth, likeUser);

export default router;
