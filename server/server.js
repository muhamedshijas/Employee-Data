import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dbConnect from './config/dbConnect.js'
import path from 'path'
import adminRouter from './Routers/adminRoutes.js'
const app= express()
dbConnect()
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.resolve()+"/public"))
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
    ],
    credentials: true,
  })
);
app.use('/admin',adminRouter)

 app.listen(5000,()=>{
    console.log("running on port 5000")
 })