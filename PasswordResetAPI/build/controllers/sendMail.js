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
exports.GET_USER = void 0;
const mailer_1 = require("./mailer");
const DB_OPERATIONS_1 = require("../helpers/DB_OPERATIONS");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// DEBUGGING | LOGGING
const log = console.log;
// ESTABLISH CONNECTION WITH DATABASE(SQL SERVER)
const GET_USER = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        // EXECUTE STORED PROCEDURE TO GET USER BY EMAIL | Passed as part of the request
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;
        // CHECK IF USER EMAIL EXISTS
        if (!email) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        // SEND EMAIL TO USER
        yield (0, mailer_1.INIT_MAIL_SERVER)(email);
        const payload = user.map(userInfo => {
            const { userPassword, streetAddress, city, country, phone } = userInfo, rest = __rest(userInfo, ["userPassword", "streetAddress", "city", "country", "phone"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, { expiresIn: '360000s' });
        // DISPLAY SUCCESS MESSAGE
        return res.status(200).json({
            message: 'Email sent!',
            token
        });
    }
    catch (error) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.GET_USER = GET_USER;
