import express from 'express';
import { checkAdminLoggedIn } from '../Controllers/adminController.js';


const router=express.Router();
router.get("/check-auth",checkAdminLoggedIn)


export default router