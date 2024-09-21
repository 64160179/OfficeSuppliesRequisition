import express from "express";
import {
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
} from "../controllers/LocationController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/locations', verifyUser, adminOnly, getLocation);
router.post('/locations', verifyUser, adminOnly,  createLocation);
router.patch('/locations/:id', verifyUser, adminOnly, updateLocation);
router.delete('/locations/:id', verifyUser, adminOnly, deleteLocation);

export default router;