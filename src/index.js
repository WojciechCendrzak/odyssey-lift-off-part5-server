const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");
// var cors = require("cors");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  // const cors = {
  //   origin: "https://studio.apollographql.com",
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // };

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });

  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
