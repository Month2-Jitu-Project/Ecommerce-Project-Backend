//////////////////////////////
////////// IMPORTS ///////////
//////////////////////////////
import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import ejs from 'ejs';
import { sqlConfig } from "../config";
import { sendMail } from "../Helpers/sendMail";
 
// INTERFACES
interface User { 
    userId: string
    email: string
    emailSent: string
    userPassword: string
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    country: string
    phone: string
}
// EXPORT MODULE sendWelcomeEmail
export const sendWelcomeEmail = async () => {
    // ESTABLISH CONNECTION WITH DATABASE
    const pool = await mssql.connect(sqlConfig);
    const users: User[] = (await (await pool.request()).query('SELECT * FROM Users WHERE emailSent=0')).recordset;
    console.log(users);
    //loop through and send an email
    for (let user of users) {
        //send an email
        //create a message option
        ejs.renderFile('Templates/welcome.ejs', { name: user.firstName }, async (err, html) => {
            //send email
            try {

                let messageOptions = {
                    from: process.env.EMAIL,
                    to: user.email, //list of receivers
                    subject: "Welcome Email",
                    html
                }
                // SEND MAIL
                await sendMail(messageOptions);
                //update the database that the email was sent
                await pool.request().query(`UPDATE Users SET emailSent=1 WHERE userId='${user.userId}'`)
            } catch (error) {
                console.error(error);
            }
        })
    }
}

