import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import {typeDefs} from "./graphql-schema/typeDefs";
import { resolvers } from "./graphql-schema/resolver";
import mongoose from "mongoose";
import { authenticateUser } from "./graphql-mongoose/users-logic";


mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://martinfresh8:qwertyuiop123@cluster0.exeewjw.mongodb.net/")


mongoose.connection.on("connected", function () {
  console.log("database is connected");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    
    if(formattedError?.extensions?.code ===ApolloServerErrorCode.BAD_USER_INPUT) {
      return {
        message: formattedError.message,
      };
    }
    return {message: formattedError.message};
  }
});

(async ()=> {
  const { url } = await  startStandaloneServer(server, {
     listen: { port:8080 },
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
  
      if (token) {
        const user = await authenticateUser(token);
         return {user} ;
      }
      return new Error('no token found')
    },
  });
  
  console.log(`Server Running @ ${url}`);
})()

