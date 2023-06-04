/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import express, { json, request } from 'express';
import cors from 'cors';
import path from 'path';
import { log } from 'console';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
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
SERVER.use(cors({
    origin: "*"
}));
SERVER.use(json());
/////// ROUTES ///////
SERVER.use('/users', userRoutes);
SERVER.use('/products', productRoutes);
SERVER.use('/cart', cartRoutes);
SERVER.use('/orders', orderRoutes); 


// LISTEN TO CONNECTIONS ON THE SPECIFIED PORT
SERVER.listen(PORT, () => {
    log(`Server is listening at: http://localhost:${PORT}`);
})

