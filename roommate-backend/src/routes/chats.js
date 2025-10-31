import { Router } from 'express';
import auth from '../middleware/auth.js';
import { myConversations, leaveConversation } from '../controllers/chatsController.js';

const router = Router();
router.get('/', auth, myConversations);
router.post('/:id/leave', auth, leaveConversation);

export default router;
