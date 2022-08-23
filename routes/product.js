import express from 'express';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../utils/verifyToken.js';
import { addProduct, updateProduct, deleteProduct, getProductById, getProducts } from '../controllers/product.js'

const router = express.Router();

router.post("/", verifyTokenAndAdmin, addProduct)

router.put("/:id", verifyTokenAndAdmin, updateProduct)

// DELETE METHOD
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)

router.get("/find/:id", getProductById)

// get all
router.get("/", getProducts)

export default router;