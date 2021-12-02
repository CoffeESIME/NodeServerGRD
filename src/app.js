import express from "express";
import config from './config.js'

const app=express();

//settings
app.set('port', config.port)
export default app;