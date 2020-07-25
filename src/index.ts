import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

// create an instance of Express server
const app = express();
const port = 9000;

// create an instance of Apollo server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

app.listen(port);

console.log(`[app]: http://localhost:${port}`);

// if not using body-parser, can we remove from package.json?
