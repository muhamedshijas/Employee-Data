import express from 'express';
import { addEmployee, adminLogin, adminLogout, checkAdminLoggedIn } from '../Controllers/adminController.js';


const router=express.Router();
router.get("/check-auth",checkAdminLoggedIn)
router.post("/login",adminLogin)
router.post("/addemployee",addEmployee)
router.get('/logout',adminLogout)
export default router