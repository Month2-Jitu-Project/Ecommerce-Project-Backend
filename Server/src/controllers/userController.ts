////////////////////////
/////// IMPORTS ///////
//////////////////////
import { Request, Response } from 'express';
import crypto from 'crypto';
//// DEBUGGING | LOGGING ////
import { log } from 'console';
/////////////////////////////
import { DB_OPERATIONS } from '../helpers/DB_OPERATIONS';
import { validationSchema } from '../helpers/LOGIN_VALIDATION';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import jwt from 'jsonwebtoken';

// EXPORT MODULE | GET USER BY ID
export const getUserById = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { userId })).recordset[0];
        // CHECK IF USER ID EXISTS
        if (!userId) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | GET USERS
export const getUsers = async (req: Request, res: Response) => {
    try {
        // EXECUTE STORED PROCEDURE
        let users = await (await DB_OPERATIONS.EXECUTE('getUsers')).recordset;
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | ADD USER
export const addUser = async (req: Request, res: Response) => {
    try {
        // CREATE RANDOM UUID FOR USER
        const userId = crypto.randomUUID();
        // GET VALUES FROM REQUEST BODY(The req body does not have a body
        // hence the use of User to extend the type Request)
        const {
            email,
            userPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        } = req.body;
        //////////////////////////////////////////
        ////////////// VALIDATION ///////////////
        ////////////////////////////////////////
        const { error } = validationSchema.validate(req.body);
        // ERROR HANDLING IN CASE VALIDATION FAILS
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        // HASH PASSWORD
        let hashedPassword = await bcrypt.hash(userPassword, 10);
        // EXECUTE STORED PROCEDURE
        await DB_OPERATIONS.EXECUTE('addUser', {
            userId,
            email,
            userPassword: hashedPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        })
        res.status(201).json({
            message: 'User added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        // GET USER TO UPDATE BY ID
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { userId })).recordset[0];

        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        // UPDATE USER | User info
        const {
            email,
            userPassword, /* GET INFO FROM request body */
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        } = req.body;

        // ENCRYPT UPDATED PASSWORD
        let hashedPassword = await bcrypt.hash(userPassword, 10);
        // EXECUTE STORED PROCEDURE TO UPDATE USER
        await DB_OPERATIONS.EXECUTE('updateUser', {
            userId,
            email,
            userPassword: hashedPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        });

        res.status(201).json({
            message: 'User updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        await (await DB_OPERATIONS.EXECUTE('deleteUser', { userId }));
        // CHECK IF USER ID EXISTS
        if (!userId) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        res.status(200).json({
            message: 'User deleted!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

// EXPORT MODULE | USER LOGIN
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, userPassword } = req.body as { email: string, userPassword: string };
        // EXECUTE STORED PROCEDURE
        let user = await (await DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;
        // CHECK IF USER ID EXISTS
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        ////////////////////////////////////
        // COMPARE & VALIDATE PASSWORD HERE
        ///////////////////////////////////
        let validPassword = await bcrypt.compare(userPassword, user[0].userPassword);

        if (!validPassword) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        // EXTRACT UNWANTED INFO FROM PAYLOAD BEFORE TOKENIZATION
        const payload = user.map(userInfo => {
            const {
                userPassword,
                streetAddress,
                city,
                country,
                phone,
                ...rest
            } = userInfo;
            return rest;
        })
        // GENERATE TOKEN AND ASSIGN TO USER
        const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, { expiresIn: '360000s' });

        return res.status(200).json({
            message: 'User logged in successfully!',
            token
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}