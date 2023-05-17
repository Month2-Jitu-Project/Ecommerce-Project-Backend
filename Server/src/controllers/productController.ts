import { Request, Response } from 'express';
import { DB_OPERATIONS } from '../helpers/DB_OPERATIONS';
import { Product } from '../../types';
import crypto from 'crypto';

// EXPORT MODULE | addProduct
export const addProduct = async (req: Product, res: Response) => {
    try {
        // GENERATE UNIQUE ID AND ASSIGN IT TO THE product
        const productId = crypto.randomUUID();
        const {
            productName,
            productImage,
            productDescription,
            price
        } = req.body;
        // CHECK IF token INFO EXISTS & READ TOKEN INFO i.e identify product owner from the  token used
        if (req.info) {
            // EXECUTE STORED PROCEDURE | addProduct
            await DB_OPERATIONS.EXECUTE('addProduct', {
                productId,
                productName,
                productImage,
                productDescription,
                price
            });
        }
        return res.status(201).json({
            message: 'Product added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | DELETE 
export const deleteProduct = async (req: Product, res: Response) => {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // GET PRODUCT BY ID
        let product = await (await DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];
        // DISPLAY ERROR MESSAGE IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        // EXECUTE STORED PROCEDURE TO DELETE
        // PRODUCT
        await DB_OPERATIONS.EXECUTE('deleteProduct', { productId });

        res.status(200).json({
            message: 'Product deleted successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | updateProduct
export const updateProduct = async (req: Product, res: Response) => {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // EXECUTE STORED PROCEDURE TO GET PRODUCT BY ID
        let product = (await DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];
        // DISPLAY ERROR IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        // EXTRACT product Details FROM REQUEST BODY
        const {
            productName,
            productImage,
            productDescription,
            price
        } = req.body;

        // EXECUTE STORED PROCEDURE TO UPDATE PRODUCT
        await DB_OPERATIONS.EXECUTE('updateProduct', {
            productId,
            productName,
            productImage,
            productDescription,
            price
        });

        res.status(201).json({
            message: 'Product updated successfully!'
        })
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | GET ALL PRODUCTS
export const getAllProducts = async (req: Product, res: Response) => {
    try {
        // EXECUTE STORED PROCEDURE TO GET ALL PRODUCTS
        let products = (await DB_OPERATIONS.EXECUTE('getProducts')).recordset;

        res.status(200).json(products)
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | GET PRODUCT BY ID
export const getProductById = async (req: Product, res: Response) => {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // EXECUTE STORED PROCEDURE TO GET PRODUCT BY ID
        let product = (await DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];

        // DISPLAY ERROR IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }

        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}