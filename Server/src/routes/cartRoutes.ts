////////////////////////////
//////// IMPORTS //////////
////////////////////////////
import { Router } from "express";
import { 
    GetCartById, 
    addToCart, 
    deleteItemFromCart, 
    getItemsInCart, 
    updateCart 
} from "../controllers/cartController";

// INITIALIZE ROUTER
const cartRoutes = Router()
// ROUTES
cartRoutes.post('/addToCart', addToCart);              // ADD TO CART
cartRoutes.get('/getItemsInCart', getItemsInCart);     // GET CART ITEMS
cartRoutes.get('/GetCartById/:id', GetCartById);       // GET CART BY ID
cartRoutes.put('/update/:id', updateCart);             // UPDATE CART
cartRoutes.delete('/delete/:id', deleteItemFromCart);  // DELETE ITEM CART

// EXPORTS
export default cartRoutes;