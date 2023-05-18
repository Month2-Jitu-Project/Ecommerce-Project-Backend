"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////////////////////
////// IMPORTS //////
//////////////////////
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const sendMail_1 = require("../controllers/sendMail");
const resetPassword_1 = require("../controllers/resetPassword");
// INITIALIZE ROUTER
const resetRouter = (0, express_1.Router)();
// ROUTES
resetRouter.get('/:email', sendMail_1.GET_USER); // SEND MAIL TO RESET PASSWORD
resetRouter.put('/password/:email', verifyToken_1.VERIFY_TOKEN, resetPassword_1.RESET_PASSWORD); // RESET PASSWORD
// EXPORTS
exports.default = resetRouter;
