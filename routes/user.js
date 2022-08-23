import express from 'express';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../utils/verifyToken.js';
import { updateUser, deleteUser, getUserById, getUsers, getUserStats } from '../controllers/user.js';

const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);

// DELETE METHOD
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

router.get("/find/:id", verifyTokenAndAdmin, getUserById);

// get all
router.get("/", verifyTokenAndAdmin, getUsers);

// get users stats per months
router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;