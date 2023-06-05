//////////////////////
////// IMPORTS //////
////////////////////
import joi from 'joi';
// SCHEMA
export const validationSchema = joi.object({
    email: joi.string().email().required(),
    // CHECK IF PASSWORD REQUIREMENTS ARE MET
    userPassword: joi.string().pattern(new RegExp('/^(?=.*[A-Za-z])[A-Za-z\d\S]{8,}$/')),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    streetAddress: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    phone: joi.string().required()
})
