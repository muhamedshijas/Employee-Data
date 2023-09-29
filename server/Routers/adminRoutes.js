import express from 'express';
import { adminLogin, adminLogout, checkAdminLoggedIn } from '../Controllers/adminController.js';


const router=express.Router();
router.get("/check-auth",checkAdminLoggedIn)
router.post("/login",adminLogin)
router.get('/logout',adminLogout)
export default router