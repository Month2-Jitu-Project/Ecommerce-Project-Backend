////////////////////////////
///////// IMPORTS /////////
//////////////////////////
import { Request } from "express";

// INTERFACES
interface decodedData {
    userId: string
    email: string
    firstName: string
    lastName: string
}

interface Info extends Request {
    info?: decodedData
}

interface Product extends Request {
    body: {
        productName: string
        productImage: string
        productDescription: string
        price: number
    },
    params: {
        productId: string
    },
    info?:decodedData
}

interface User extends Request {
    body: {
        email: string
        userPassword: string
        firstName: string
        lastName: string
        streetAddress: string
        city: string
        country: string
        phone: string
    },
    params: {
        userId: string
    }
}
