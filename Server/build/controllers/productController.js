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
exports.getProductById = exports.getAllProducts = exports.updateProduct = exports.deleteProduct = exports.addProduct = void 0;
const DB_OPERATIONS_1 = require("../helpers/DB_OPERATIONS");
const crypto_1 = __importDefault(require("crypto"));
// EXPORT MODULE | addProduct
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // GENERATE UNIQUE ID AND ASSIGN IT TO THE product
        const productId = crypto_1.default.randomUUID();
        const { productName, productImage, productDescription, category, price } = req.body;
        // CHECK IF token INFO EXISTS & READ TOKEN INFO i.e identify product owner from the  token used
        if (req.info) {
            // EXECUTE STORED PROCEDURE | addProduct
            yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addProduct', {
                productId,
                productName,
                productImage,
                productDescription,
                category,
                price
            });
        }
        return res.status(201).json({
            message: 'Product added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addProduct = addProduct;
// EXPORT MODULE | DELETE 
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // GET PRODUCT BY ID
        let product = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];
        // DISPLAY ERROR MESSAGE IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        // EXECUTE STORED PROCEDURE TO DELETE
        // PRODUCT
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteProduct', { productId });
        res.status(200).json({
            message: 'Product deleted successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteProduct = deleteProduct;
// EXPORT MODULE | updateProduct
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // EXECUTE STORED PROCEDURE TO GET PRODUCT BY ID
        let product = (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];
        // DISPLAY ERROR IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        // EXTRACT product Details FROM REQUEST BODY
        const { productName, productImage, productDescription, category, price } = req.body;
        // EXECUTE STORED PROCEDURE TO UPDATE PRODUCT
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateProduct', {
            productId,
            productName,
            productImage,
            productDescription,
            category,
            price
        });
        res.status(201).json({
            message: 'Product updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateProduct = updateProduct;
// EXPORT MODULE | GET ALL PRODUCTS
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXECUTE STORED PROCEDURE TO GET ALL PRODUCTS
        let products = (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getProducts')).recordset;
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.getAllProducts = getAllProducts;
// EXPORT MODULE | GET PRODUCT BY ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXTRACT productId FROM REQUEST BODY
        const { productId } = req.params;
        // EXECUTE STORED PROCEDURE TO GET PRODUCT BY ID
        let product = (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getProductById', { productId })).recordset[0];
        // DISPLAY ERROR IF PRODUCT IS NOT FOUND
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.getProductById = getProductById;
