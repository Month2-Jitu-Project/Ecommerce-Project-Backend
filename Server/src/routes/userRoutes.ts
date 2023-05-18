/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/userController";

// INITIALIZE ROUTER
const userRoutes = Router();
// ROUTES
userRoutes.get('', getUsers);               // GET ALL USERS
userRoutes.post('', addUser);               // ADD USER
userRoutes.post('/login', loginUser);       // USER LOGIN
userRoutes.get('/:userId', getUserById);    // GET USER BY ID
userRoutes.delete('/:userId', deleteUser);  // DELETE USER
userRoutes.put('/:userId', updateUser);     // UPDATE USER

// EXPORTS
export default userRoutes;
