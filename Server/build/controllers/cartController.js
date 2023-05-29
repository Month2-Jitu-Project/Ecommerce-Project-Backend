"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromCart = exports.updateCart = exports.GetCartById = exports.getItemsInCart = exports.addToCart = void 0;
/////////////////////////////
/////////// IMPORTS /////////
/////////////////////////////
const uuid_1 = require("uuid");
const config_1 = require("../config/config");
const mssql_1 = __importDefault(require("mssql")); // **** CHECK THIS | Message to Samuel Ndambuki ****
const DB_OPERATIONS_1 = require("../helpers/DB_OPERATIONS");
// EXPORT MODULE addToCart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXTRACT INFO FROM REQUEST BODY
        const { productid, userid, price } = req.body;
        const id = (0, uuid_1.v4)();
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('InsertIntoCart', { id, userid, price, productid });
        // Check if the product exists in the database
        const productQuery = `SELECT * FROM products WHERE id = '${productid}'`;
        const productResult = yield DB_OPERATIONS_1.DB_OPERATIONS.QUERY(productQuery);
        const product = productResult.recordset[0];
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        // Check if the product is already in the user's cart
        const cartItemQuery = `SELECT * FROM cart WHERE userid = '${userid}' AND productid = '${productid}'`;
        const cartItemResult = yield DB_OPERATIONS_1.DB_OPERATIONS.QUERY(cartItemQuery);
        const cartItem = cartItemResult.recordset[0];
        if (cartItem) {
            // If the product is already in the cart, increment the quantity
            const newQuantity = cartItem.quantity + 1;
            const updateQuery = `UPDATE cart SET quantity = ${newQuantity} WHERE userid = '${userid}' AND productid = '${productid}'`;
            yield DB_OPERATIONS_1.DB_OPERATIONS.QUERY(updateQuery);
        }
        else {
            // If the product is not in the cart, add it with quantity 1
            const insertQuery = `INSERT INTO cart (userid, productid, quantity) VALUES ('${userid}', '${productid}', 1)`;
            yield DB_OPERATIONS_1.DB_OPERATIONS.QUERY(insertQuery);
        }
        return res.json({ message: 'Product added to cart.' });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json(err.message);
    }
});
exports.addToCart = addToCart;
// EXPORT MODULE getItemsInCart
const getItemsInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cartItems = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('GetItemsInCart')).recordset;
        return res.status(200).json(cartItems);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getItemsInCart = getItemsInCart;
// EXPORT MODULE getCartById
const GetCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXTRACT ID FROM REQUEST PARAMS
        const { id } = req.params;
        let item = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset[0];
        // CHECK IF CART IS PRESENT
        if (!item) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(item);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.GetCartById = GetCartById;
// EXPORT MODULE updateCart
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ESTABLISH CONNECTION WITH DATABASE
        const pool = yield mssql_1.default.connect(config_1.SQL_SERVER_CONFIG);
        // EXTRACT id FROM REQUEST PARAMS
        const { id } = req.params;
        let item = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset;
        // CHECK ITEM IS IN CART
        if (!item.length) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        // EXTRACT USER INFO FROM REQUEST BODY
        const { userid, productid, quantity, price } = req.body;
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('UpdateCart', { userid, productid, quantity, price }));
        return res.status(201).json({ message: "Cart updated successfully" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateCart = updateCart;
// EXPORT MODULE deleteItemFromCart 
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ESTABLISH CONNECTION WITH DATABASE
        const pool = yield mssql_1.default.connect(config_1.SQL_SERVER_CONFIG);
        // EXTRACT CART ID FROM PARAMS
        const { id } = req.params;
        let item = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('GetCartById', { id })).recordset;
        // CHECK IF CART IS EMPTY
        if (!item.length) {
            return res.status(404).json({ message: "Cart not found" });
        }
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('DeleteCartById', { id }));
        return res.status(200).json({ message: "Cart deleted successfully" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteItemFromCart = deleteItemFromCart;
