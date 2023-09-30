import express from 'express'
import { verifyToken } from '../middleware/jwt.js';
import { createReview, getReview, deleteReview } from '../controllers/review.controller.js'

const router = express.Router();

router.post('/', verifyToken, createReview);
router.get('/:gigId', verifyToken, getReview);
router.delete('/', verifyToken, deleteReview);


export default router;