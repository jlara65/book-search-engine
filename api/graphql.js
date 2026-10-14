const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { typeDefs, resolvers } = require('../server/schemas');
const connect = require('../server/config/connection');
const { authMiddleware } = require('../server/utils/auth');

const server = new ApolloServer({ typeDefs, resolvers });
const ready = server.start();
const app = express();

app.use(
  '/api/graphql',
  cors(),
  express.json(),
  async (req, res, next) => {
    await ready;
    await connect();
    next();
  },
  expressMiddleware(server, {
    context: async ({ req }) => authMiddleware({ req }),
  }),
);
module.exports = app;
