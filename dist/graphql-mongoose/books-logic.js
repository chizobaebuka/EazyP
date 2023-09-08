"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBook = exports.editBook = exports.getUserBook = exports.getBooks = exports.getBook = exports.addBook = void 0;
const userModel_1 = require("../mongoose-schema/userModel");
const bookModel_1 = require("../mongoose-schema/bookModel");
const graphql_1 = require("graphql");
const graphQlError = (message) => {
    throw new graphql_1.GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
        },
    });
};
const addBook = async ({ title, author, datePublished, pageCount, genre, publisher, description, }) => {
    try {
        const isTitleExist = await bookModel_1.BookModel.findOne({ title });
        if (isTitleExist) {
            graphQlError("Duplicate title");
        }
        const newBook = await bookModel_1.BookModel.create({
            title,
            author,
            datePublished,
            pageCount,
            genre,
            publisher,
            description,
        });
        return newBook;
    }
    catch (error) {
        return error;
    }
};
exports.addBook = addBook;
const getBook = async (id) => {
    try {
        const book = await bookModel_1.BookModel.findById(id);
        if (!book) {
            graphQlError("Book not found");
        }
        return book;
    }
    catch (error) {
        return error;
    }
};
exports.getBook = getBook;
const getBooks = async () => {
    const books = await bookModel_1.BookModel.find();
    return books;
};
exports.getBooks = getBooks;
const getUserBook = async (id) => {
    try {
        const user = await userModel_1.UserModel.findById(id);
        if (!user) {
            graphQlError("User not found");
        }
        const book = await bookModel_1.BookModel.findOne({ userId: id });
        if (!book) {
            return graphQlError("User has not created a book");
        }
        return book;
    }
    catch (error) {
        return error;
    }
};
exports.getUserBook = getUserBook;
const editBook = async ({ _id, title, author, datePublished, description, pageCount, genre, publisher, }) => {
    try {
        const update = {
            title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            publisher,
        };
        const editedBook = await bookModel_1.BookModel.updateOne({ _id }, update);
        return editedBook.modifiedCount;
    }
    catch (error) {
        return error;
    }
};
exports.editBook = editBook;
const removeBook = async (id) => {
    try {
        const book = await bookModel_1.BookModel.findById(id);
        if (!book) {
            return graphQlError("Book not found");
        }
        const check = await bookModel_1.BookModel.findByIdAndDelete(id);
        return { message: "Book deleted successfully" };
    }
    catch (error) {
        return error;
    }
};
exports.removeBook = removeBook;
