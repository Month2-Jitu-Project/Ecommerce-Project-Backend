import { Response } from 'express';
import { DB_OPERATIONS } from '../helpers/DB_OPERATIONS';
import { Order } from '../../types';
import crypto from 'crypto';

// EXPORT MODULE | addProduct
export const addOrder = async (req: Order, res: Response) => {
    try {
        // GENERATE UNIQUE ID AND ASSIGN IT TO THE order
        const orderId = crypto.randomUUID();
        const {
            orderDate,
            totalAmount
        } = req.body;

        // CHECK IF token INFO EXISTS & READ TOKEN INFO i.e identify product owner from the  token used

        // EXECUTE STORED PROCEDURE | addOrder
        await DB_OPERATIONS.EXECUTE('addOrder', {
            orderId,
            orderDate,
            totalAmount
        });


        return res.status(201).json({
            message: 'Order added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}