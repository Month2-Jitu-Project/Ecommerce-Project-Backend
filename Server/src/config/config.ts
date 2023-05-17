///////////////////////////
//////// IMPORTS /////////
/////////////////////////
import mssql from 'mssql';
import path from 'path';
import dotenv from 'dotenv';
import { log } from 'console';
// CONFIGURE DOTENV PATH
dotenv.config({ path:path.resolve(__dirname, '../../.env') });
///////////////////////////////
// SQL SERVER CONFIGURATION //
///////////////////////////////
export const sqlServerConfig = {
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
/////////////////////////////////////
/////// CONNECT TO DATABASE ////////
///////////////////////////////////
export const establishConnection = async () => {
    const pool = await mssql.connect(sqlServerConfig);
    if (pool) {
        log('Connected to database...');
    }
}
