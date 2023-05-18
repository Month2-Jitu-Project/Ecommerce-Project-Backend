import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.resolve(__dirname, '../../.env')});

// MAILING SERVER CONFIGURATION
let configOptions = {
    host:"smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}

function createTransporter(configOpts:any){
    return nodemailer.createTransport(configOpts);
}

export async function sendMail(messageOptions:any){
    let transporter = createTransporter(configOptions);

    await transporter.sendMail(messageOptions,(err,response)=>{
        console.log(response);
    })
}

