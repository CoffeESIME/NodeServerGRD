import Jwt from "jsonwebtoken";
import { getConnection } from "../database/connection.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: " No token provided" });
    const decoded = Jwt.verify(token, "ARDUARDO");
    req.user_id=decoded.id
    const pool = await getConnection();
    const user = await pool
      .request()
      .query(`SELECT * FROM [arduardo].[user] WHERE user_id= ${decoded.id}`);
    console.log(user.recordset[0].user_id);
    
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorize" });
  }
};

export const isAdmin = async (req,res, next) => {
    const user_id=req.user_id;
    const pool= await getConnection();
    const request= await pool
    .request()
    .query(`SELECT [user_level] FROM [arduardo].[user] WHERE user_id= ${user_id}`);
    console.log(request.recordset[0].user_level)
    if(request.recordset[0].user_level ==0){
        next()
        return;
    }
    return res.status(403).json({ message : "requiere un rol mas alto"});
};
export const isUser = async () => {};
