import express from 'express';
import {
    getWareHouse,

} from '../controllers/WareHouseController.js';

const router = express.Router();

router.get('/wareHouse', getWareHouse);

export default router;