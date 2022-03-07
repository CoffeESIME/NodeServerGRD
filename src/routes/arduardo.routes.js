import { Router } from "express";
import {getArduardo, newData, selectFecha} from "../controllers/arduardo.controller.js";
const router=Router();


router.get('/', getArduardo);
router.post('/data', newData );
router.delete('/',);
router.put('/', );
router.post('/fecha',selectFecha );

export default router;