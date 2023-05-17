/////////////////////////
//////// IMPORTS ///////
///////////////////////
import { NextFunction, Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import jwt from "jsonwebtoken";
import { Info, decodedData } from "../../types";

// EXPORT MODULE | VERIFY_TOKEN
export const VERIFY_TOKEN = (req: Info, res: Response, next: NextFunction) => {
    try {
        // READ token FROM REQUEST
        const token = req.headers['token'] as string;
        // CHECK IF A TOKEN EXISTS
        if (!token) {
            return res.status(403).json({
                message: 'Unauthorized access!'
            });
        }
        // CHECK IF TOKEN IS VALID OR EXPIRED
        const decodedData = jwt.verify(token, process.env.SECRET_KEY as string) as decodedData;
        // READ DECODED INFORMATION FROM REQUEST
        req.info = decodedData;

    } catch (error: any) {
        // FORBIDDEN : Deny user access if the request body 
        // does not contain a valid token
        res.status(403).json(`ERROR: ${error.message}`);
    }
    // CALL NEXT FUNCTION IN ORDER TO LET THE REQUEST PROCEED
    next();
}