import express, { application } from "express";
import config from './config.js'
import grdRoutes from './routes/grds.routes.js'
const app=express();

//settings
app.set('port', config.port)
app.use(express.json());

//middleware
app.use(grdRoutes)
export default app;