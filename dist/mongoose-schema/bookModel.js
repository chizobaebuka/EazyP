"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    datePublished: { type: String },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
}, {
    timestamps: true,
});
exports.BookModel = mongoose_1.default.model("books", BookSchema);
