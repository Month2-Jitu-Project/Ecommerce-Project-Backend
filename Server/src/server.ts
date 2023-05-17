/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import express, { json } from 'express';
import path from 'path';
import { log } from 'console';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
// CONFIGURE DOTENV PATH
dotenv.config({ path:path.resolve(__dirname, '../../.env') });
/////////////////////////////////////
/////// INITIALIZE SERVER //////////
///////////////////////////////////
const SERVER = express();
const PORT = 4000;
///////////////////////////
/////// MIDDLEWARE ///////
/////////////////////////
SERVER.use(json());
/////// ROUTES ///////
SERVER.use('/users', userRoutes);
SERVER.use('/products', productRoutes);


// LISTEN TO CONNECTIONS ON THE SPECIFIED PORT
SERVER.listen(PORT, () => {
    log(`Server is listening at: http://localhost:${PORT}`);
})

