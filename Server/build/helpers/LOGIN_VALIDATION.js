"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
//////////////////////
////// IMPORTS //////
////////////////////
const joi_1 = __importDefault(require("joi"));
// SCHEMA
exports.validationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    // CHECK IF PASSWORD REQUIREMENTS ARE MET
    userPassword: joi_1.default.string().pattern(new RegExp('/^(?=.*[A-Za-z])[A-Za-z\d\S]{8,}$/')),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    streetAddress: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    phone: joi_1.default.string().required()
});
