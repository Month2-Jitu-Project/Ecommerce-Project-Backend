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
exports.deleteItemFromCart = exports.updateCart = exports.GetCartById = exports.getItemsInCart = exports.addItemToCart = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const DatabaseHelper_1 = require("../DatabaseHelper");
const config_1 = require("../config/config");
//add item to cart
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid, userid } = req.body;
        const id = (0, uuid_1.v4)();
        // Call the stored procedure to add or update the cart item
        yield DatabaseHelper_1.DatabaseHelper.exec('AddOrUpdateCartItem', { cartid: id, userid, productid });
        return res.json({ message: 'Item added to cart successfully.' });
    }
    catch (error) {
        // Handle error
        return res.status(500).json(error.message);
    }
});
exports.addItemToCart = addItemToCart;
//get items in cart
const getItemsInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //destructure
        // const{id} = req.params
        //strong type
        let cartItems = yield (yield DatabaseHelper_1.DatabaseHelper.exec('GetItemsInCart')).recordset;
        return res.status(200).json(cartItems);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getItemsInCart = getItemsInCart;
//Get item in cart
const GetCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //destructure
        const { id } = req.params;
        //strong type
        let item = yield (yield DatabaseHelper_1.DatabaseHelper.exec('GetCartById', { id })).recordset[0];
        //if cart is undefined
        if (!item.length) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(item);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.GetCartById = GetCartById;
//Update Cart
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.SQL_SERVER_CONFIG);
        //destructure
        const { id } = req.params;
        //strong type
        let item = yield (yield DatabaseHelper_1.DatabaseHelper.exec('GetCartById', { id })).recordset;
        //if cart is undefined
        if (!item.length) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        const { userid, productid, quantity, price } = req.body;
        yield (yield DatabaseHelper_1.DatabaseHelper.exec('UpdateCart', { userid, productid, quantity, price }));
        return res.status(201).json({ message: "Cart updated successfully" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateCart = updateCart;
//Delete Item from cart
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //destructure
        const { id } = req.params;
        //strong type
        let items = yield (yield DatabaseHelper_1.DatabaseHelper.exec('GetCartById', { id })).recordset;
        //if cart is undefined
        if (!items.length) {
            return res.status(404).json({ message: "Cart not found" });
        }
        for (const item of items) {
            const { productid } = item;
            // Decrease the quantity of the product by one
            yield (yield DatabaseHelper_1.DatabaseHelper.exec('DeleteProductFromCart', { cartid: id, productid }));
        }
        return res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteItemFromCart = deleteItemFromCart;
