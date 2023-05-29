"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
////////////////////////////
//////// IMPORTS //////////
////////////////////////////
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
// INITIALIZE ROUTER
const cartRoutes = (0, express_1.Router)();
// ROUTES
cartRoutes.post('/addToCart', cartController_1.addToCart); // ADD TO CART
cartRoutes.get('/getItemsInCart', cartController_1.getItemsInCart); // GET CART ITEMS
cartRoutes.get('/GetCartById/:id', cartController_1.GetCartById); // GET CART BY ID
cartRoutes.put('/update/:id', cartController_1.updateCart); // UPDATE CART
cartRoutes.delete('/delete/:id', cartController_1.deleteItemFromCart); // DELETE ITEM CART
// EXPORTS
exports.default = cartRoutes;
