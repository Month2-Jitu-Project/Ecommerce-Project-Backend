//////////////////////
////// IMPORTS //////
//////////////////////
import { Router } from "express";
import { INIT_MAIL_SERVER } from "../controllers/mailer";
import { VERIFY_TOKEN } from "../middleware/verifyToken";
import { GET_USER } from "../controllers/sendMail";
import { RESET_PASSWORD } from "../controllers/resetPassword";
// INITIALIZE ROUTER
const resetRouter = Router();
// ROUTES
resetRouter.get('/:email', GET_USER); // SEND MAIL TO RESET PASSWORD
resetRouter.put('/password/:email', VERIFY_TOKEN, RESET_PASSWORD); // RESET PASSWORD

// EXPORTS
export default resetRouter;