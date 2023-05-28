import {v4 as cartid} from 'uuid'
import { sqlConfig } from '../config'
import { Request,Response } from "express";
import mssql,{Request as MSSQLRequest }  from 'mssql';
import { DatabaseHelper } from '../DatabaseHelper';

interface ExtendedCartRequest extends Request{
    body:{
        userid:string
        productid:string
        quantity:number
        price:string
    }
}

interface ItemInCart{
  id:string
  userid:string
  productid:string
  quantity:number
  price:string
}

//add item to cart
export const addItemToCart = async (req:Request, res:Response)  => {
  try {
    const { productid ,userid} = req.body;
    const id = cartid();
    // Call the stored procedure to add or update the cart item
    await DatabaseHelper.exec('AddOrUpdateCartItem', {cartid:id,userid,productid});
    return res.json({ message: 'Item added to cart successfully.' });

  } catch (error:any) {
    // Handle error
    return res.status(500).json(error.message);
  }
};

  //get items in cart
  export const getItemsInCart = async (req:Request,res:Response) =>{
    try {
        //destructure
        // const{id} = req.params
        //strong type
        let cartItems:ItemInCart[] = await (await DatabaseHelper.exec('GetItemsInCart')).recordset
      
        return res.status(200).json(cartItems)
    
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get item in cart
export const GetCartById = async (req:Request<{id:string}>,res:Response) =>{
  try {
      //destructure
      const{id} = req.params
      //strong type
      let item:ItemInCart[] =  await (await DatabaseHelper.exec('GetCartById',{id})).recordset[0]

      //if cart is undefined

      if(!item.length){
          return res.status(404).json({message:"Cart not found"})
      }

      return res.status(200).json(item)
  
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}

//Update Cart
export const updateCart = async (req:Request<{id:string}>,res:Response) =>{
  try {

      const pool  = await mssql.connect(sqlConfig)
      //destructure
      const{id} = req.params
      //strong type
      let item:ItemInCart[] = await (await DatabaseHelper.exec('GetCartById',{id})).recordset
      //if cart is undefined
      if(!item.length){
          return res.status(404).json({message:"Cart item not found"})
      }

      const {userid,productid,quantity,price} = req.body

      await (await DatabaseHelper.exec('UpdateCart',{userid,productid,quantity,price}))

        return res.status(201).json({message:"Cart updated successfully"})

      
  } catch (error:any) {
      return res.status(500).json(error.message)
  }

}

//Delete Item from cart
export const deleteItemFromCart = async(req:Request,res:Response) =>
{
    try {
        //destructure
        const{id} = req.params
        //strong type
        let items:ItemInCart[] = await (await DatabaseHelper.exec('GetCartById',{id})).recordset

        //if cart is undefined

        if(!items.length){
            return res.status(404).json({message:"Cart not found"})
        }

        for (const item of items) {
          const {productid } = item;
          // Decrease the quantity of the product by one
          await ( await DatabaseHelper.exec('DeleteProductFromCart',{cartid:id,productid}))
        }
    
        return res.status(200).json({message:"Item deleted successfully"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}


