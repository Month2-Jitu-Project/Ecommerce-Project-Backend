/////////////////////////////
/////////// IMPORTS /////////
/////////////////////////////
import { v4 as cartid } from 'uuid';
import { SQL_SERVER_CONFIG } from '../config/config';
import { Request, Response } from "express";
import mssql, { Request as MSSQLRequest } from 'mssql'; // **** CHECK THIS | Message to Samuel Ndambuki ****
import { DB_OPERATIONS } from '../helpers/DB_OPERATIONS';

// INTERFACES
interface ExtendedCartRequest extends Request {
    body: {
        userid: string
        productid: string
        quantity: number
        price: string
    }
}

interface ItemInCart extends Request {
    id: string
    userid: string
    productid: string
    quantity: number
    price: string
}

// EXPORT MODULE addToCart
export const addToCart = async (req: ExtendedCartRequest, res: Response) => {
    try {
        // EXTRACT INFO FROM REQUEST BODY
        const { productid, userid, price } = req.body;
        const id = cartid();

        await DB_OPERATIONS.EXECUTE('InsertIntoCart', { id, userid, price, productid });

        // Check if the product exists in the database
        const productQuery = `SELECT * FROM products WHERE id = '${productid}'`;
        const productResult = await DB_OPERATIONS.QUERY(productQuery);
        const product = productResult.recordset[0];

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Check if the product is already in the user's cart
        const cartItemQuery = `SELECT * FROM cart WHERE userid = '${userid}' AND productid = '${productid}'`;
        const cartItemResult = await DB_OPERATIONS.QUERY(cartItemQuery);
        const cartItem = cartItemResult.recordset[0];

        if (cartItem) {
            // If the product is already in the cart, increment the quantity
            const newQuantity = cartItem.quantity + 1;
            const updateQuery = `UPDATE cart SET quantity = ${newQuantity} WHERE userid = '${userid}' AND productid = '${productid}'`;
            await DB_OPERATIONS.QUERY(updateQuery);
        } else {
            // If the product is not in the cart, add it with quantity 1
            const insertQuery = `INSERT INTO cart (userid, productid, quantity) VALUES ('${userid}', '${productid}', 1)`;
            await DB_OPERATIONS.QUERY(insertQuery);
        }

        return res.json({ message: 'Product added to cart.' });
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
}

// EXPORT MODULE getItemsInCart
export const getItemsInCart = async (req: Request, res: Response) => {
    try {
        let cartItems: ItemInCart[] = await (await DB_OPERATIONS.EXECUTE('GetItemsInCart')).recordset;
        return res.status(200).json(cartItems);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}

// EXPORT MODULE getCartById
export const GetCartById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // EXTRACT ID FROM REQUEST PARAMS
        const { id } = req.params;
        let item = await (await DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset[0];

        // CHECK IF CART IS PRESENT
        if (!item) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(item);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}

// EXPORT MODULE updateCart
export const updateCart = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // ESTABLISH CONNECTION WITH DATABASE
        const pool = await mssql.connect(SQL_SERVER_CONFIG);
        // EXTRACT id FROM REQUEST PARAMS
        const { id } = req.params;
        let item: ItemInCart[] = await (await DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset;

        // CHECK ITEM IS IN CART
        if (!item.length) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        // EXTRACT USER INFO FROM REQUEST BODY
        const { userid, productid, quantity, price } = req.body;

        await (await DB_OPERATIONS.EXECUTE('UpdateCart', { userid, productid, quantity, price }));
        return res.status(201).json({ message: "Cart updated successfully" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}

// EXPORT MODULE deleteItemFromCart 
export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        // ESTABLISH CONNECTION WITH DATABASE
        const pool = await mssql.connect(SQL_SERVER_CONFIG);
        // EXTRACT CART ID FROM PARAMS
        const { id } = req.params;
        let item: ItemInCart[] = await (await DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset;

        // CHECK IF CART IS EMPTY
        if (!item.length) {
            return res.status(404).json({ message: "Cart not found" });
        }

        await (await DB_OPERATIONS.EXECUTE('DeleteCartById', { id }));
        return res.status(200).json({ message: "Cart deleted successfully" })
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}
