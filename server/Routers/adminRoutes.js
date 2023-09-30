import express from 'express';
import { addEmployee, adminLogin, adminLogout, checkAdminLoggedIn, editEmployee, getDeleteEmployee, getEmployeeData } from '../Controllers/adminController.js';


const router=express.Router();
router.get("/check-auth",checkAdminLoggedIn)
router.post("/login",adminLogin)
router.post("/addemployee",addEmployee)
router.get('/logout',adminLogout)
router.get('/getEmployeeData/',getEmployeeData)
router.put('/editEmployee/',editEmployee)
router.get('/delete/:id',getDeleteEmployee)

export default router