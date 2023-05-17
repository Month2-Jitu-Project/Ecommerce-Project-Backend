/////////////////////////////////////////
/////////////// IMPORTS ////////////////
///////////////////////////////////////
import mssql from 'mssql';
import { sqlServerConfig } from '../config/config';
/////////////////////////////////////////
// HELPER CLASS : DB_OPERATIONS        //
// This class establishes a connection //
// with a Database and provides        //
// methods for interacting             //
// with it                             //
////////////////////////////////////////

// EXPORT CLASS dbFunctions
export class DB_OPERATIONS {
    // MAKE THE pool PROPERTY ONLY
    // ACCESSIBLE  WITHIN THE CLASS
    // DB_FUNCTIONS USING THE private
    // KEYWORD AND ESTABLISH A CONNECTION
    // WITH THE DATABASE
    private static pool: Promise<mssql.ConnectionPool> = mssql.connect(sqlServerConfig);
    //////////////////////////////////////////
    ///// METHOD FOR APPENDING REQUESTS /////
    ////////////// TO INPUT ////////////////
    ////////////////////////////////////////
    static appendRequests(request: mssql.Request, data: { [x: string]: string | number } = {}) {
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
        })
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
    static async EXECUTE(storedProcedure: string, data: { [x: string]: string | number } = {}) {
        // CREATE AN EMPTY REQUEST
        // (Request with no input) 
        // TO THE SQL SERVER
        // await THE RESPONSE
        let request: mssql.Request = await (await this.pool).request();
        // CALL THE APPEND METHOD AND APPEND THE DATA
        request = DB_OPERATIONS.appendRequests(request, data);

        return await request.execute(storedProcedure);
    }
    ///////////////////////////////////////////
    ////// METHOD FOR EXECUTING QUERIES //////
    // Take 1 parameter : queryString<string>
    /////////////////////////////////////////
    static async QUERY(queryString:string) {
        return (await (await DB_OPERATIONS).pool).request().query(queryString)
    }
}