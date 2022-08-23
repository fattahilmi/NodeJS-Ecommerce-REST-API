import express from 'express';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../utils/verifyToken.js';
import { addCart, updateCart, deleteCart, getCart, getUserCart } from '../controllers/cart.js';

const router = express.Router();

router.post("/", addCart);

router.put("/:id", verifyTokenAndAuthorization, updateCart);

// DELETE METHOD
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart)

// get all
router.get("/", verifyTokenAndAdmin, getCart);

export default router;