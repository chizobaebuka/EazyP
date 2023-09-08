"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassWord = exports.hashPassword = exports.decode = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const genToken = ({ email, id }) => {
    const token = jsonwebtoken_1.default.sign({ email, id }, 'secret', { expiresIn: '7d' });
    return token;
};
exports.genToken = genToken;
const decode = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, 'secret');
    return decoded;
};
exports.decode = decode;
const hashPassword = async (password) => {
    const saltFactor = process.env.SALTFACTOR || 10;
    const salt = await bcrypt_1.default.genSalt(saltFactor);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const comparePassWord = async (user, password) => {
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    return isMatch;
};
exports.comparePassWord = comparePassWord;
