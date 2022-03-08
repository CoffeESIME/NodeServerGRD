import express from "express";
import config from './config.js'
import arduardoRoutes from './routes/arduardo.routes.js';
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';
import morgan from 'morgan';
const app=express();

//settings
app.set('port', config.port);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//middleware
app.use('/API/arduardo',arduardoRoutes);
app.use('/API/auth',authRoutes );
export default app;