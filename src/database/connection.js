import sql from "mssql";

const dbsettings = {
  user: "Fabian",
  password: "2012+Return",
  server: "GDL-LAP-296",
  database: "grd2",
  options: {
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbsettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

