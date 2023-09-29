import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const checkAdminLoggedIn=async (req, res) => {
    try {
      const token = req.cookies.adminToken;
     
      if (!token) 
        return res.json({loggedIn:false, error:true, message:"no token"});
    
      const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
      return res.json({name:verifiedJWT.name, loggedIn: true});
    } catch (err) {
      res.json({loggedIn:false, error:err});
    }
}