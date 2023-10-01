import express from 'express'
import { getOrder, createOrder } from '../controllers/order.controller.js'
import { verifyToken } from '../middleware/jwt.js'

const router = express.Router();

router.get('/', verifyToken, getOrder );
router.post('/:gigId', verifyToken, createOrder );


export default router;