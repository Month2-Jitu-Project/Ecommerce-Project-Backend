///////////////////////
////// IMPORTS ///////
///////////////////// 
import resetRouter from "./routers/resetRouter";
import express, { json } from "express";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const PORT = process.env.PORT || 8000;
// INITIALIZE SERVER
const SERVER = express();
// MIDDLEWARE
SERVER.use(json());
// ROUTER
SERVER.use('/reset', resetRouter);

// LISTEN ON SPECIFIED PORT
SERVER.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});


