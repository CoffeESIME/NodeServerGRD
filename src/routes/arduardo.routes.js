import { Router } from "express";
import {getArduardo, newData, selectFecha} from "../controllers/arduardo.controller.js";
import {verifyToken, isAdmin, isUser} from '../middlewares/auth.Jwt.js';
const router=Router();


router.get('/', [verifyToken,isAdmin], getArduardo);
router.post('/data', newData );
router.delete('/',);
router.put('/', );
router.post('/fecha',selectFecha );

export default router;