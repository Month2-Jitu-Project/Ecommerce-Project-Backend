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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = exports.getUserById = void 0;
const crypto_1 = __importDefault(require("crypto"));
/////////////////////////////
const DB_OPERATIONS_1 = require("../helpers/DB_OPERATIONS");
const LOGIN_VALIDATION_1 = require("../helpers/LOGIN_VALIDATION");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// EXPORT MODULE | GET USER BY ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserById', { userId })).recordset[0];
        // CHECK IF USER ID EXISTS
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.getUserById = getUserById;
// EXPORT MODULE | GET USERS
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // EXECUTE STORED PROCEDURE
        let users = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUsers')).recordset;
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.getUsers = getUsers;
// EXPORT MODULE | ADD USER
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CREATE RANDOM UUID FOR USER
        const userId = crypto_1.default.randomUUID();
        // GET VALUES FROM REQUEST BODY(The req body does not have a body
        // hence the use of User to extend the type Request)
        const { email, userPassword, firstName, lastName, streetAddress, city, country, phone } = req.body;
        //////////////////////////////////////////
        ////////////// VALIDATION ///////////////
        ////////////////////////////////////////
        const { error } = LOGIN_VALIDATION_1.validationSchema.validate(req.body);
        // ERROR HANDLING IN CASE VALIDATION FAILS
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        // HASH PASSWORD
        let hashedPassword = yield bcrypt_1.default.hash(userPassword, 10);
        // EXECUTE STORED PROCEDURE
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addUser', {
            userId,
            email,
            userPassword: hashedPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        });
        res.status(201).json({
            message: 'User added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addUser = addUser;
// EXPORT MODULE | UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // GET USER TO UPDATE BY ID
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserById', { userId })).recordset[0];
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        // UPDATE USER | User info
        const { email, userPassword, /* GET INFO FROM request body */ firstName, lastName, streetAddress, city, country, phone } = req.body;
        // ENCRYPT UPDATED PASSWORD
        let hashedPassword = yield bcrypt_1.default.hash(userPassword, 10);
        // EXECUTE STORED PROCEDURE TO UPDATE USER
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateUser', {
            userId,
            email,
            userPassword: hashedPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        });
        res.status(201).json({
            message: 'User updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateUser = updateUser;
// EXPORT MODULE | DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteUser', { userId }));
        // CHECK IF USER ID EXISTS
        if (!userId) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        res.status(200).json({
            message: 'User deleted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
// EXPORT MODULE | USER LOGIN
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userPassword } = req.body;
        // EXECUTE STORED PROCEDURE
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;
        // CHECK IF USER ID EXISTS
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        ////////////////////////////////////
        // COMPARE & VALIDATE PASSWORD HERE
        ///////////////////////////////////
        let validPassword = yield bcrypt_1.default.compare(userPassword, user[0].userPassword);
        if (!validPassword) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        // EXTRACT UNWANTED INFO FROM PAYLOAD BEFORE TOKENIZATION
        const payload = user.map(userInfo => {
            const { userPassword, streetAddress, city, country, phone } = userInfo, rest = __rest(userInfo, ["userPassword", "streetAddress", "city", "country", "phone"]);
            return rest;
        });
        // GENERATE TOKEN AND ASSIGN TO USER
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, { expiresIn: '360000s' });
        return res.status(200).json({
            message: 'User logged in successfully!',
            token
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.loginUser = loginUser;
