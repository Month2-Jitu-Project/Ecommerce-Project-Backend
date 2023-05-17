///////////////////////////
//////// IMPORTS /////////
/////////////////////////
import path from 'path';
import dotenv from 'dotenv';

// CONFIGURE DOTENV PATH
dotenv.config({ path:path.resolve(__dirname, '../../.env') });
///////////////////////////////
// SQL SERVER CONFIGURATION //
///////////////////////////////
export const SQL_SERVER_CONFIG = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    server: process.env.DB_SERVER as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}

