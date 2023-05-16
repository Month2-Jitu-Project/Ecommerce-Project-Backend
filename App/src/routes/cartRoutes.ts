import { Router } from "express";
import { GetCartById, addToCart, deleteItemFromCart, getItemsInCart,updateCart } from "../controllers/cartController";

const cartRoutes = Router()


cartRoutes.post('/addToCart',addToCart)
cartRoutes.get('/getItemsInCart',getItemsInCart)
cartRoutes.get('/GetCartById/:id',GetCartById)
cartRoutes.put('/update/:id',updateCart)
cartRoutes.delete('/delete/:id',deleteItemFromCart)



export default cartRoutes