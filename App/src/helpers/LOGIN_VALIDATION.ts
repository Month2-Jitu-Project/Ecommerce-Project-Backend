//////////////////////
////// IMPORTS //////
////////////////////
import joi from 'joi';
// SCHEMA
export const validationSchema = joi.object({
    email: joi.string().email().required(),
    userPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    streetAddress: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    phone: joi.string().required()
})