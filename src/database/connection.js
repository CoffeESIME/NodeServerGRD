import sql from "mssql";

const dbsettings = {
  user: "Fabian",
  password: "Coffee1996",
  server: "GDL-LAP-296",
  database: "arduardo",
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

