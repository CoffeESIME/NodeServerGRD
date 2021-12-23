import { Router } from "express";
import {getGRD, newData, selectFecha} from "../controllers/grd.controller.js";
const router=Router();


router.get('/grd', getGRD);
router.post('/grd', newData );
router.delete('/grd',);
router.put('/grd', );
router.post('/fecha',selectFecha );
export default router;