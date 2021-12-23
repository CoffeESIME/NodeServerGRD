import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getGRD = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(
      "SELECT TOP (10) [historial_id],[grd_id],[register_type],[timestamp],[address],[value] FROM [grd].[grd].[historical]"
    );
  res.json(result.recordset);
};

export const newData = async (req, res) => {
  const { grd_id, value, address, historical_type, register_type, timestamp } =
    req.body;
  const pool = await getConnection();
  pool
    .request()
    .input("grd", sql.Int, grd_id)
    .input("valor", sql.Int, value)
    .input("tipo", sql.Int, register_type)
    .input("tipohisto", sql.Int, historical_type)
    .input("tiempo", sql.DateTime2, timestamp)
    .input("direccion", sql.Int, address)
    .query(
      "INSERT INTO [grd].[grd].[historical] (grd_id,register_type,historical_type,timestamp,address,value) VALUES (@grd, @tipo, @tipohisto, @tiempo,@direccion, @valor)"
    );
  res.json("nuevos datos");
};

export const selectFecha = async (req, res) => {
    const desde='2020-12-02' 
    const hasta='2020-12-30'
    console.log(desde,hasta)
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(`SELECT timestamp, sum(CASE WHEN [address] =1 THEN value END) 'Corriente', sum(CASE WHEN [address]=2 THEN value END) 'Frecuencia' FROM  [grd].[grd].[historical] WHERE [grd_id]=1 AND [register_type]=11 AND ([timestamp]>='${desde}' AND [timestamp]<='${hasta}') GROUP BY [timestamp]`
    );
  res.json(result.recordset);
  console.log(result)
};
