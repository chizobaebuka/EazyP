"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const books_logic_1 = require("../graphql-mongoose/books-logic");
const users_logic_1 = require("../graphql-mongoose/users-logic");
exports.resolvers = {
    Query: {
        // async books(root:string, {}, {}) {
        //   const book = await getBooks();
        //   return book;
        // },
        async book(_, { id }) {
            const book = await (0, books_logic_1.getBook)(id);
            return book;
        },
        async users() {
            const users = await (0, users_logic_1.getAllUsers)();
            return users;
        },
        async user(_, { id }) {
            const user = await (0, users_logic_1.getSingleUser)(id);
            return user;
        },
        async bookByUser(_, { userId }) {
            const book = await (0, books_logic_1.getUserBook)(userId);
            return book;
        },
    },
    Mutation: {
        async createBook(_, { title, author, pageCount, genre, publisher, description, datePublished }, context) {
            if (!context.user) {
                return null;
            }
            const newBook = await (0, books_logic_1.addBook)({
                title,
                author,
                datePublished,
                pageCount,
                genre,
                publisher,
                description,
            });
            return newBook;
        },
        async updateBook(root, { _id, title, author, datePublished, description, pageCount, genre, publisher, }) {
            const updatedBook = await (0, books_logic_1.editBook)({
                _id,
                title,
                author,
                datePublished,
                description,
                pageCount,
                genre,
                publisher,
            });
            return updatedBook;
        },
        async deleteBook(_, { _id }) {
            return (0, books_logic_1.removeBook)(_id);
        },
        async deleteUser(_, { _id }) {
            return (0, users_logic_1.removeUser)(_id);
        },
        async createUser(_, { email, name, password }) {
            const newUser = await (0, users_logic_1.insertUser)({ email, name, password });
            return newUser;
        },
        async updateUser(root, { _id, name, email, password, }) {
            const updatedUser = await (0, users_logic_1.editUser)({
                _id,
                name,
                email,
                password,
            });
            return updatedUser;
        },
        async loginUser(_, { email, password }, {}) {
            const user = await (0, users_logic_1.logUserIn)({ email, password });
            return user;
        },
    },
};
