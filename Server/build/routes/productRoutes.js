"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////////
///////// IMPORTS //////////
///////////////////////////
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const verifyToken_1 = require("../middleware/verifyToken");
// INITIALIZE ROUTER
const productRoutes = (0, express_1.Router)();
// ROUTES
productRoutes.post('', verifyToken_1.VERIFY_TOKEN, productController_1.addProduct); // ADD PRODUCT
productRoutes.delete('/:productId', productController_1.deleteProduct); // DELETE PRODUCT
productRoutes.put('/:productId', productController_1.updateProduct); // UPDATE PRODUCT
productRoutes.get('', productController_1.getAllProducts); // GET ALL PRODUCTS
productRoutes.get('/:productId', productController_1.getProductById); // GET PRODUCT BY ID
// EXPORTS
exports.default = productRoutes;
