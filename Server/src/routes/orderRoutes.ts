import { Router } from "express";
import { addOrder } from "../controllers/orderController";

// INITIALIZE ROUTER
const orderRoutes = Router();
// ROUTES
orderRoutes.post('', addOrder); // ADD ORDER

export default orderRoutes;