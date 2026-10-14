const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { typeDefs, resolvers } = require('../server/schemas');
const connect = require('../server/config/connection');
const { authMiddleware } = require('../server/utils/auth');

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// Start Apollo once, then build the middleware after it has started
let handlerPromise;
const getHandler = () =>
  (handlerPromise ??= server.start().then(() =>
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware({ req }),
    }),
  ));

app.use('/api/graphql', cors(), express.json(), async (req, res, next) => {
  try {
    await connect();
    const handler = await getHandler();
    return handler(req, res, next);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
