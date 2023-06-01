"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INIT_MAIL_SERVER = void 0;
//////////////////////
////// IMPORTS //////
////////////////////
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// DEBUGGING | ERROR LOGGING
const log = console.log;
// MAIN FUNCTION
const INIT_MAIL_SERVER = (USER_EMAIL) => __awaiter(void 0, void 0, void 0, function* () {
    // CREATE TRANSPORTER OBJECT USING DEFAULT SMTP TRANSPORT
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'stacknewbie@gmail.com',
            pass: 'uarptokxapbdrskl'
        }
    });
    // HTML CONTENT
    let htmlContent = `
        <h4>
            Your password has been reset | <span>Successfully</span>
            <a href="http://localhost:4200">                   
                Navigate to homepage
            </a>
        </h4>
    `;
    // SEND MAIL WITH DEFINED TRANSPORT OBJECT
    let info = yield transporter.sendMail({
        from: process.env.EMAIL,
        to: USER_EMAIL,
        subject: 'Swyft | Password Reset',
        html: htmlContent
    });
    // LOG MESSAGE INFO
    log('Message sent: %s', info.messageId);
});
exports.INIT_MAIL_SERVER = INIT_MAIL_SERVER;
