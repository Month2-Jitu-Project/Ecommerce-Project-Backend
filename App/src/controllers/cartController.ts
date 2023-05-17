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

interface ItemInCart extends Request{
  id:string
  userid:string
  productid:string
  quantity:number
  price:string
}

//add item to cart
 export const addToCart = async (req: ExtendedCartRequest, res: Response) => {

  try {
    const { productid ,userid,price } = req.body;

    const id = cartid();

    await DatabaseHelper.exec('InsertIntoCart',{id,userid,price,productid})

    // Check if the product exists in the database
    const productQuery = `SELECT * FROM products WHERE id = '${productid}'`;
    const productResult =  await DatabaseHelper.query(productQuery)
    const product = productResult.recordset[0];

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if the product is already in the user's cart
    const cartItemQuery = `SELECT * FROM cart WHERE userid = '${userid}' AND productid = '${productid}'`;
    const cartItemResult = await DatabaseHelper.query(cartItemQuery)
    const cartItem = cartItemResult.recordset[0];

    if (cartItem) {
      // If the product is already in the cart, increment the quantity
      const newQuantity = cartItem.quantity + 1;
      const updateQuery = `UPDATE cart SET quantity = ${newQuantity} WHERE userid = '${userid}' AND productid = '${productid}'`;
      await DatabaseHelper.query(updateQuery)
    } else {
      // If the product is not in the cart, add it with quantity 1
      const insertQuery = `INSERT INTO cart (userid, productid, quantity) VALUES ('${userid}', '${productid}', 1)`;
      await DatabaseHelper.query(insertQuery)
    }

    return res.json({ message: 'Product added to cart.' });
  } catch (err:any) {
    console.error(err.message);
    return res.status(500).json(err.message);
  }
};



  //get items in cart
  export const getItemsInCart = async (req:Request,res:Response) =>{
    try {
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
      let item =  await (await DatabaseHelper.exec('GetCartById',{id})).recordset[0]

      //if cart is undefined

      if(!item){
        
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
        const pool  = await mssql.connect(sqlConfig)
        //destructure
        const{id} = req.params
        //strong type
        let item:ItemInCart[] = await (await DatabaseHelper.exec('GetCartById',{id})).recordset

        //if cart is undefined

        if(!item.length){
            return res.status(404).json({message:"Cart not found"})
        }

        await (await DatabaseHelper.exec('DeleteCartById',{id}))
        
        return res.status(200).json({message:"Cart deleted successfully"})


    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}
