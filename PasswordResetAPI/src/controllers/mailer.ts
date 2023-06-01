//////////////////////
////// IMPORTS //////
////////////////////
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// DEBUGGING | ERROR LOGGING
const log = console.log;

// MAIN FUNCTION
export const INIT_MAIL_SERVER = async (USER_EMAIL: string) => {
    // CREATE TRANSPORTER OBJECT USING DEFAULT SMTP TRANSPORT
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'stacknewbie@gmail.com', // MAILING SERVER CREDENTIALS
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
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: USER_EMAIL,
        subject: 'Swyft | Password Reset',
        html: htmlContent
    });
    // LOG MESSAGE INFO
    log('Message sent: %s', info.messageId);
}

