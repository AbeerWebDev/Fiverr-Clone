import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { getMessages, createMessage } from '../controllers/message.controller.js'

const router = express.Router();

router.get('/:id', verifyToken, getMessages);
router.post("/", verifyToken, createMessage);



export default router;