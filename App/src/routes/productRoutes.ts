import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productsController";

const productRoutes = Router()


productRoutes.post('/',addProduct)
productRoutes.get('/product',getAllProducts)
productRoutes.get('/:id',getProduct)
productRoutes.put('/:id',updateProduct)
productRoutes.delete('/:id',deleteProduct)



export default productRoutes