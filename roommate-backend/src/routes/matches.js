import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getSuggestedMatches, likeUser, getMatches } from '../controllers/matchesController.js';

const router = Router();

router.get('/', auth, getMatches);
router.get('/recommendations', auth, getSuggestedMatches);
router.post('/like/:userId', auth, likeUser);

export default router;

