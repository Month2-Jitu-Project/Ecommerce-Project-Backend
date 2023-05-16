import { Request,Response} from "express";
import mssql from 'mssql';
import {sqlConfig} from "../config";
import {v4 as pid} from 'uuid'
import { DatabaseHelper } from "../DatabaseHelper";

//getting all properties request has
//body is strong typed
interface ExtendedRequest extends Request{
    body:{
        name:string
        price:number
    }
}

interface Product{
    id:string
    name:string
    price:number
}

export const addProduct=async (req:ExtendedRequest,res:Response) =>{
    //logic to add a product to database
    try{

        let id = pid()

        const {name,price} = req.body

        //connect to database
       

        //send request to database

        await DatabaseHelper.exec('InsertProduct',{id,name,price})
        //make a request
        // await pool.request()
        // .input('id',mssql.VarChar,id)
        // .input('name',mssql.VarChar,name)
        // .input('price',mssql.VarChar,price)
        // .execute('InsertProduct')

        return res.status(201).json({message:"Product added successfully!!"})

    }catch(error:any){
        //server side error
        return res.status(500).json(error.message)
    }
}

//Get products
export const getAllProducts = async (req:Request,res:Response) =>{
    try {
        //destructure
        // const{id} = req.params
        //strong type
        let products:Product[] =  await (await DatabaseHelper.exec('ReadProducts')).recordset
        return res.status(200).json(products)
    
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get product
export const getProduct = async (req:Request<{id:string}>,res:Response) =>{
    try {
        //destructure
        const{id} = req.params
        //strong type
        let product:Product[] = await (await DatabaseHelper.exec('GetProductById',{id})).recordset[0]

        //if product is undefined

        if(!product.length){
            return res.status(404).json({message:"Product not found"})
        }

        return res.status(200).json(product)
    
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


//Update Product
export const updateProduct = async (req:Request<{id:string}>,res:Response) =>{
    try {

        // const pool  = await mssql.connect(sqlConfig)
        //destructure
        const{id} = req.params
        //strong type
        let product:Product[] = await (await DatabaseHelper.exec('GetProductById',{id})).recordset
        

        //if product is undefined

        if(!product.length){
            return res.status(404).json({message:"Product not found"})
        }

        const {name,price} = req.body
          //make a request
          await (await DatabaseHelper.exec('UpdateProduct',{id,name,price}))

        //   await pool.request()
        //   .input('id',mssql.VarChar,id)
        //   .input('name',mssql.VarChar,name)
        //   .input('price',mssql.VarChar,price)
        //   .execute('UpdateProduct')
          return res.status(201).json({message:"Product updated successfully"})

        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}


//Delete Product
export const deleteProduct = async(req:Request,res:Response) =>
{
    try {
        
        //destructure
        const{id} = req.params
        //strong type
        let product:Product[] = await (await DatabaseHelper.exec('GetProductById',{id})).recordset[0]

        //if product is undefined

        if(!product.length){
            return res.status(404).json({message:"Product not found"})
        }

        await (await DatabaseHelper.exec('GetProductById',{id})).recordset
        return res.status(200).json({message:"Product deleted successfully"})


    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}