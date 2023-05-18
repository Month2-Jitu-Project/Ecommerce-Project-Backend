"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_SERVER_CONFIG = void 0;
///////////////////////////
//////// IMPORTS /////////
/////////////////////////
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// CONFIGURE DOTENV PATH
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
///////////////////////////////
// SQL SERVER CONFIGURATION //
///////////////////////////////
exports.SQL_SERVER_CONFIG = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};
