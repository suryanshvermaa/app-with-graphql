import { ApolloServer } from "@apollo/server";
import userSchema from "../graphql/schemas/user.schema";
import userResolver from "../graphql/resolvers/user.rosolver";

const apolloServer=new ApolloServer({
    typeDefs:userSchema,
    resolvers:userResolver
})

export default apolloServer;