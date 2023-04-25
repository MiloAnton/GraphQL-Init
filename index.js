const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const schema = buildSchema(`

`);

const rootValue = {

};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(4000, () =>
  console.log("Serveur myEfrei en attente : http://localhost:4000/graphql")
);
