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
exports.DB_OPERATIONS = void 0;
/////////////////////////////////////////
/////////////// IMPORTS ////////////////
///////////////////////////////////////
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../config/config");
/////////////////////////////////////////
// HELPER CLASS : DB_OPERATIONS        //
// This class establishes a connection //
// with a Database and provides        //
// methods for interacting             //
// with it                             //
////////////////////////////////////////
// EXPORT CLASS dbFunctions
class DB_OPERATIONS {
    //////////////////////////////////////////
    ///// METHOD FOR APPENDING REQUESTS /////
    ////////////// TO INPUT ////////////////
    ////////////////////////////////////////
    static appendRequests(request, data = {}) {
        // GET OBJECT KEYS FROM THE 
        // data OBJECT i.e 
        // Object.keys({ key1: value1 }, { key2: value2 })
        // Output --> ["key1", "key2"]
        const keys = Object.keys(data);
        // LOOP THROUGH THE keys AND APPEND
        // THE key AND IT'S value TO THE input PARAMETER OF
        // THE request
        keys.map(key => {
            return request.input(key, data[key]);
        });
        return request;
    }
    ////////////////////////////////////////
    // METHOD FOR EXECUTING STORED 
    // PROCEDURES.Takes in 2 parameters:
    // storedProcedure<string> and 
    // data<Object> as well as an
    // empty object, {}, as the **default**
    // value for procedures that don't return
    // values
    //////////////////////////////////////////
    static EXECUTE(storedProcedure, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // CREATE AN EMPTY REQUEST
            // (Request with no input) 
            // TO THE SQL SERVER
            // await THE RESPONSE
            let request = yield (yield this.pool).request();
            // CALL THE APPEND METHOD AND APPEND THE DATA
            request = DB_OPERATIONS.appendRequests(request, data);
            return yield request.execute(storedProcedure);
        });
    }
    ///////////////////////////////////////////
    ////// METHOD FOR EXECUTING QUERIES //////
    // Takes 1 parameter : queryString<string>
    /////////////////////////////////////////
    static QUERY(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield DB_OPERATIONS).pool).request().query(queryString);
        });
    }
}
// MAKE THE pool PROPERTY ONLY
// ACCESSIBLE  WITHIN THE CLASS
// DB_FUNCTIONS USING THE private
// KEYWORD AND ESTABLISH A CONNECTION
// WITH THE DATABASE
DB_OPERATIONS.pool = mssql_1.default.connect(config_1.SQL_SERVER_CONFIG);
exports.DB_OPERATIONS = DB_OPERATIONS;
