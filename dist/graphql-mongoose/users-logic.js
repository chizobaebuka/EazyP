"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.editUser = exports.logUserIn = exports.getSingleUser = exports.getAllUsers = exports.insertUser = exports.authenticateUser = void 0;
const helper_functions_1 = require("../helper/helper-functions");
const userModel_1 = require("../mongoose-schema/userModel");
const graphql_1 = require("graphql");
const graphQlError = (message) => {
    throw new graphql_1.GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
        },
    });
};
const authenticateUser = async (token) => {
    const { id } = (0, helper_functions_1.decode)(token);
    const user = await userModel_1.UserModel.findById(id);
    return user;
};
exports.authenticateUser = authenticateUser;
const insertUser = async ({ email, name, password }) => {
    try {
        const user = await userModel_1.UserModel.findOne({ email });
        if (user) {
            return graphQlError(`${user} is already in use`);
        }
        const newUser = new userModel_1.UserModel({
            email,
            name,
            password,
        });
        const hashedPassword = await (0, helper_functions_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        return savedUser;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.insertUser = insertUser;
const getAllUsers = async () => {
    const users = await userModel_1.UserModel.find();
    return users;
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (id) => {
    try {
        const user = await userModel_1.UserModel.findById(id);
        if (!user) {
            return graphQlError("User not found");
        }
        return user;
    }
    catch (error) {
        return error;
    }
};
exports.getSingleUser = getSingleUser;
const logUserIn = async ({ email, password }) => {
    try {
        const aUser = await userModel_1.UserModel.findOne({ email });
        if (!aUser) {
            return graphQlError("Email does not exist. Please register");
        }
        const verifyPassword = await (0, helper_functions_1.comparePassWord)(aUser, password);
        if (!verifyPassword) {
            return graphQlError("Invalid Login");
        }
        const token = (0, helper_functions_1.genToken)({ email, id: aUser?._id?.toString() });
        aUser.token = token;
        return aUser;
    }
    catch (error) {
        return error;
    }
};
exports.logUserIn = logUserIn;
const editUser = async ({ _id, email, password, name }) => {
    try {
        const update = {
            email,
            password,
            name
        };
        const editedUser = await userModel_1.UserModel.updateOne({ _id }, update);
        return editedUser.modifiedCount;
    }
    catch (error) {
        return error;
    }
};
exports.editUser = editUser;
const removeUser = async (id) => {
    try {
        const user = await userModel_1.UserModel.findById(id);
        if (!user) {
            return graphQlError("User not found");
        }
        const removedUser = await userModel_1.UserModel.findByIdAndDelete(id);
        return { message: "User deleted successfully" };
    }
    catch (error) {
        return error;
    }
};
exports.removeUser = removeUser;
