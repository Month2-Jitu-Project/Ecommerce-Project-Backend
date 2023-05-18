"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
// INITIALIZE ROUTER
const userRoutes = (0, express_1.Router)();
// ROUTES
userRoutes.get('', userController_1.getUsers); // GET ALL USERS
userRoutes.post('', userController_1.addUser); // ADD USER
userRoutes.post('/login', userController_1.loginUser); // USER LOGIN
userRoutes.get('/:userId', userController_1.getUserById); // GET USER BY ID
userRoutes.delete('/:userId', userController_1.deleteUser); // DELETE USER
userRoutes.put('/:userId', userController_1.updateUser); // UPDATE USER
// EXPORTS
exports.default = userRoutes;
