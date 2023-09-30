import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import cloudinary from "../config/cloudinary.js";
import employeeModel from "../Models/employeeModel.js";

export const checkAdminLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.adminToken;

        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
        return res.json({ name: verifiedJWT.name, loggedIn: true });
    } catch (err) {
        res.json({ loggedIn: false, error: err });
    }
}
export const adminLogin = async (req, res) => {
    console.log(req.body)
    const admin = { email: "shijas@gmail.com", password: "abcd123" }
    if (req.body.email !== admin.email) {
        res.json({ err: true, message: "no such user found" })
    } else if (req.body.password !== admin.password) {
        res.json({ err: true, message: "please enter a valid password" })
    }
    else {
        const token = jwt.sign({
            id: admin.email
        }, "myjwtsecretkey"
        )
        return res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ error: false })
    }
}
export const adminLogout = async (req, res) => {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}
export const addEmployee = async (req, res) => {
    try {
        const profile = await cloudinary.uploader.upload(req.body.profile, {
            folder: 'Employee'
        })
        const existUser = await employeeModel.findOne({ email: req.body.email }).lean()
        if (!existUser) {
            const employee = await employeeModel.create({ ...req.body, profile })
        } else {
            console.log(existUser)
            res.json({ err: true, message: "User already Exist" })

        }

        res.json({ err: false })
    } catch (err) {
        console.log(err)
    }
}
export const getEmployeeData=async(req,res)=>{
    try{
        const name=req.query.name?? ""
      const employees=  await employeeModel.find({name:new RegExp(name, 'i')}).lean()
      const employeesCount=  await employeeModel.find({name:new RegExp(name, 'i')}).countDocuments()
      res.json({employees,employeesCount})
    }catch(err){
        console.log(err);
    }
}
export async function getDeleteEmployee(req,res){
  try{
    console.log("hiiii")
    const id=req.params.id

    await employeeModel.findByIdAndDelete(id)
    res.json({err:false})
  }catch(err){
    cinsole.log(err)
  }
}
export const editEmployee = async (req, res) => {
    try {
        const profile = await cloudinary.uploader.upload(req.body.profile, {
            folder: 'Employee'
        });

        const _id = req.body._id;
        const { name, email, phone, designation, gender, qualifications } = req.body; // Extract the updated fields from the request body

        const updatedEmployee = {
            name,
            email,
            phone,
            designation,
            gender,
            qualifications,
            profile: profile, 
        };

        // Use findByIdAndUpdate to update the employee data
        await employeeModel.findByIdAndUpdate(_id, updatedEmployee);

        res.json({ err: false });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
};
