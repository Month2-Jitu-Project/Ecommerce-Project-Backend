import mssql from "mssql"
import { sqlConfig } from "../config"

export class DatabaseHelper{
    //private - dont need it outside the class
    //the type is a promise
    private static pool:Promise<mssql.ConnectionPool> = mssql.connect(sqlConfig)
    ///whenever an instance s created we can create a connection pool
  
    private static addInputsToRequest(request:mssql.Request,data:{[x:string]:string | number}={}){
        const keys = Object.keys(data) 
        keys.map(keyName=>{
            return request.input(keyName,data[keyName])
        })
        return request
    }

    //receive
    static async exec(storedProcedure:string,data:{[x:string]:string | number}={})
    {   
        //create a request
        let request :mssql.Request = await (await DatabaseHelper.pool).request() //empty - no inputs
        request = DatabaseHelper.addInputsToRequest(request,data)
        return request.execute(storedProcedure)
    }

    static async query(queryString:string){
        return (await DatabaseHelper.pool).request().query(queryString)
    }
}