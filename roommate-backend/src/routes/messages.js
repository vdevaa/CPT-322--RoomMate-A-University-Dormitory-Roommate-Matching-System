import { Router } from 'express';
import auth from '../middleware/auth.js';
import { listMessages, sendMessage } from '../controllers/messagesController.js';

const router = Router();
router.get('/:id', auth, listMessages);
router.post('/:id', auth, sendMessage);

export default router;
