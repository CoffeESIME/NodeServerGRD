import { Router } from "express";
import { newUser,login } from "../controllers/auth.controller.js";
const router=Router();
router.post('/new-user', newUser);
router.post('/login', login)
export default router;