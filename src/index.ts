// instead of having this require here, moved it to package.json/scripts
// require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';

// The "type" of the Express app instance will be the Application interface
// that is imported from the express declaration file
const mount = async (app: Application) => {
	// run the connectDatabase function
	const db = await connectDatabase();

	// create an instance of Apollo server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ db })
	});
	server.applyMiddleware({
		app,
		path: '/api'
	});

	app.listen(process.env.PORT);

	console.log(`[app]: http://localhost:${process.env.PORT}`);

	// testing the db connection
	const listings = await db.listings.find({}).toArray();
	console.log('Listings: ', listings);
};

mount(express());

// if not using body-parser, can we remove from package.json?
