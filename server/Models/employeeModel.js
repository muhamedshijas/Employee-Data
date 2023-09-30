import mongoose from "mongoose"
const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    profile:{
        type:Object,
    },
    gender:{
        type:String
    },
    qualifications:{
        type:Array
    }

})

const employeeModel=mongoose.model("Employee", EmployeeSchema)
export default employeeModel