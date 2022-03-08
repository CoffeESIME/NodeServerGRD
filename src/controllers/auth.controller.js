import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";
import config from '../config.js'
import { getConnection } from "../database/connection.js";

import sql from "mssql";


export const newUser= async (req, res)=>{
    const {name, last_name, company, email, passwordreq}=req.body;
    let today=new Date();
    let id_user= Math.round(10*Math.PI*today.getDay()*(today.getMilliseconds()*today.getMinutes()+today.getDay()*today.getMonth()+today.getFullYear()*today.getSeconds()));
    let userLevel=0;
    const salt = await bcrypt.genSalt(10);
    const password= await bcrypt.hash(passwordreq, salt);
    const pool = await getConnection();
    const userFound = await pool
    .request()
    .query(`SELECT [user_password] from [arduardo].[user] WHERE [user_mail]='${email}'`);
    if (userFound.recordset.length!=1){

        const result = await pool
        .request()
        .input("name", sql.VarChar, name)
          .input("last_name", sql.VarChar, last_name)
          .input("company", sql.VarChar, company)
          .input("email", sql.VarChar, email)
          .input("password", sql.VarChar, password)
          .input("id_user", sql.Int, id_user)
          .input("level", sql.TinyInt, userLevel)
        .query(`INSERT INTO [arduardo].[user]
        ([user_id]
        ,[user_first_name]
        ,[user_last_name]
        ,[user_company]
        ,[user_level]
        ,[user_mail]
        ,[user_password])
      VALUES
        (@id_user,@name, @last_name,@company, @level,@email, @password)`
        );

      //   //aqui la palabra secreta necesita ir a otro archivo
      //   const token=Jwt.sign({id: id_user }, 'ARDUARDO', {
      //       expiresIn: 86400 //24 horas
      //   })
      // res.status(200).json({token});
      console.log(result)
      res.status(200).json({message: "Enviado"})
    }
    else{
        console.log("El usuario ya existe")
        res.status(200);
    }
  }
  
  export const login = async(req,res)=>{
    const { email, passwordreq}=req.body;
    const pool = await getConnection();
    const result = await pool
    .request()
    .query(`SELECT [user_password],[user_id], [user_first_name], [user_last_name], [user_level] FROM [arduardo].[user] WHERE user_mail= '${email}'`
    );
    if(result.recordset.length==1){
        const validation= await bcrypt.compare(passwordreq, result.recordset[0].user_password);
        if(validation){
            const token=Jwt.sign({id: result.recordset[0].user_id }, 'ARDUARDO', {
                expiresIn: 86400 //24 horas
            })
            res.status(200).json({token:token, user_name: result.recordset[0].user_first_name, user_last_name: result.recordset[0].user_last_name })
        }
        else{
            res.status(401).json({token: null, message: "Password doesnt match"})
        }
    }
    else{
        console.log("No hay un correo")
        res.status(200).json({message: "No hay usuario con ese correo"});
    }
    
  }