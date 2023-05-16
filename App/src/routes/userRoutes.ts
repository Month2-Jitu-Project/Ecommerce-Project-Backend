/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/userControlller";


// INITIALIZE ROUTER
const userRoutes = Router();
// ROUTES
//// GET ////
userRoutes.get('/:userId', getUserById); // GET USER BY ID
userRoutes.get('', getUsers);            // GET ALL USERS
//// POST ////
userRoutes.post('', addUser);            // ADD USER
userRoutes.post('/login', loginUser);  // USER LOGIN
//// DELETE ////
userRoutes.delete('/:userId', deleteUser); // DELETE USER
//// UPDATE ////
userRoutes.put('/:userId', updateUser); // UPDATE USER

// EXPORTS
export default userRoutes;