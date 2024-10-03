import express from "express";
import {
    getBuyIn,
    createBuyIn,
} from "../controllers/BuyInController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/buyIn', verifyUser, adminOnly, getBuyIn);
router.post('/buyIn', verifyUser, adminOnly, createBuyIn);

export default router;