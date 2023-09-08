"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const errors_1 = require("@apollo/server/errors");
const typeDefs_1 = require("./graphql-schema/typeDefs");
const resolver_1 = require("./graphql-schema/resolver");
const mongoose_1 = __importDefault(require("mongoose"));
const users_logic_1 = require("./graphql-mongoose/users-logic");
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect("mongodb+srv://martinfresh8:qwertyuiop123@cluster0.exeewjw.mongodb.net/");
mongoose_1.default.connection.on("connected", function () {
    console.log("database is connected");
});
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolver_1.resolvers,
    formatError: (formattedError, error) => {
        if (formattedError?.extensions?.code === errors_1.ApolloServerErrorCode.BAD_USER_INPUT) {
            return {
                message: formattedError.message,
            };
        }
        return { message: formattedError.message };
    }
});
(async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 8080 },
        context: async ({ req }) => {
            const token = req.headers.authorization || "";
            if (token) {
                const user = await (0, users_logic_1.authenticateUser)(token);
                return { user };
            }
            return new Error('no token found');
        },
    });
    console.log(`Server Running @ ${url}`);
})();
