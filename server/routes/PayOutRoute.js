import express from 'express';
import {
    getPayOut,
} from '../controllers/PayOutController.js';

const router = express.Router();

router.get('/payOut', getPayOut);

export default router;