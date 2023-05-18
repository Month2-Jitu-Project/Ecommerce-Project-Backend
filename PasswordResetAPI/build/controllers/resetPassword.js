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
exports.RESET_PASSWORD = void 0;
const DB_OPERATIONS_1 = require("../helpers/DB_OPERATIONS");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RESET_PASSWORD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        // GET USER TO UPDATE BY ID
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset[0];
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        // UPDATE USER | User info
        const { userPassword /* GET INFO FROM request body */ } = req.body;
        // ENCRYPT UPDATED PASSWORD
        let hashedPassword = yield bcrypt_1.default.hash(userPassword, 10);
        // EXECUTE STORED PROCEDURE TO UPDATE USER
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updatePassword', {
            email,
            userPassword: hashedPassword
        });
        res.status(201).json({
            message: 'Password updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.RESET_PASSWORD = RESET_PASSWORD;
