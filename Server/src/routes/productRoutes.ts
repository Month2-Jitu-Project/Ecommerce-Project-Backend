/////////////////////////////
///////// IMPORTS //////////
///////////////////////////
import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import { VERIFY_TOKEN } from "../middleware/verifyToken";

// INITIALIZE ROUTER
const productRoutes = Router();
// ROUTES
productRoutes.post('', VERIFY_TOKEN, addProduct); // ADD PRODUCT
productRoutes.delete('/:productId', deleteProduct); // DELETE PRODUCT
productRoutes.put('/:productId', updateProduct); // UPDATE PRODUCT
productRoutes.get('', getAllProducts); // GET ALL PRODUCTS
productRoutes.get('/:productId', getProductById); // GET PRODUCT BY ID

// EXPORTS
export default productRoutes;