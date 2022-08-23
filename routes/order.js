import express from 'express';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../utils/verifyToken.js';
import { addOrder, updateOrder, deleteOrder, getUserOrder, getOrders, getIncome } from '../controllers/order.js'

const router = express.Router();

router.post("/", addOrder)

router.put("/:id", verifyTokenAndAdmin, updateOrder)

// DELETE METHOD
router.delete("/:id", verifyTokenAndAdmin, deleteOrder)

// get user order
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder)

// get all
router.get("/", verifyTokenAndAdmin, getOrders)

// Get monthly income
router.get("/income", verifyTokenAndAdmin, getIncome)

export default router;