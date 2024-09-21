import express from "express";
import {
    getCountingUnit,
    createCountingUnit,
    updateCountingUnit,
    deleteCountingUnit
} from "../controllers/CountingUnitController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/countingUnits', verifyUser, adminOnly,  getCountingUnit);
router.post('/countingUnits', verifyUser, adminOnly,  createCountingUnit);
router.patch('/countingUnits/:id', verifyUser, adminOnly, updateCountingUnit);
router.delete('/countingUnits/:id', verifyUser, adminOnly, deleteCountingUnit);

export default router;