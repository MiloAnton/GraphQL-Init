const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const schema = buildSchema(`
  type Editor {
    idEditors: Int!
    nameEditors: String!
    games: [Game!]
  }

  type Game {
    idGames: Int!
    nameGames: String!
    editor: Editor
  }

  type Stock {
    idStock: Int!
    game: Game!
    store: Store!
    units: Int!
    prices: Float
  }

  type Store {
    idStores: Int!
    nameStores: String!
    stocks: [Stock!]
  }

  type Query {
    allEditors: [Editor!]!
    allGames: [Game]
    allStocks: [Stock!]!
    allStores: [Store!]!
  }

  type Mutation {
    createEditor(nameEditors: String!): Editor!
    createGame(nameGames: String!, idEditors: Int!): Game!
    createStore(nameStores: String!): Store!
    createStock(idGames: Int!, idStores: Int!, units: Int!, prices: Float): Stock!
    
    updateEditor(idEditors: Int!, nameEditors: String): Editor!
    updateGame(idGames: Int!, nameGames: String, idEditors: Int): Game!
    updateStore(idStores: Int!, nameStores: String): Store!
    updateStock(idStock: Int!, idGames: Int, idStores: Int, units: Int, prices: Float): Stock!
    
    deleteEditor(idEditors: Int!): Boolean!
    deleteGame(idGames: Int!): Boolean!
    deleteStore(idStores: Int!): Boolean!
    deleteStock(idStock: Int!): Boolean!
  }
`);

const rootValue = {
  allEditors: async () => {return await prisma.editors.findMany()},
  allGames: async () => {return await prisma.games.findMany()},
  allStocks: async () => {return await prisma.stock.findMany()},
  allStores: async () => {return await prisma.stores.findMany()},

  createEditor: ({ nameEditors }) =>
    prisma.editors.create({ data: { nameEditors } }),
  createGame: ({ nameGames, idEditors }) =>
    prisma.games.create({
      data: { nameGames, editors: { connect: { idEditors } } },
    }),
  createStore: ({ nameStores }) =>
    prisma.stores.create({ data: { nameStores } }),
  createStock: ({ idGames, idStores, units, prices }) =>
    prisma.stock.create({
      data: {
        games: { connect: { idGames } },
        stores: { connect: { idStores } },
        units,
        prices,
      },
    }),

  updateEditor: ({ idEditors, nameEditors }) =>
    prisma.editors.update({ where: { idEditors }, data: { nameEditors } }),
  updateGame: ({ idGames, nameGames, idEditors }) =>
    prisma.games.update({
      where: { idGames },
      data: {
        nameGames,
        editors: idEditors ? { connect: { idEditors } } : undefined,
      },
    }),
  updateStore: ({ idStores, nameStores }) =>
    prisma.stores.update({ where: { idStores }, data: { nameStores } }),
  updateStock: ({ idStock, idGames, idStores, units, prices }) =>
    prisma.stock.update({
      where: { idStock },
      data: {
        game: idGames ? { connect: { idGames } } : undefined,
        stores: idStores ? { connect: { idStores } } : undefined,
        units,
        prices,
      },
    }),

  deleteEditor: ({ idEditors }) =>
    prisma.editors
      .delete({ where: { idEditors } })
      .then(() => true)
      .catch(() => false),
  deleteGame: ({ idGames }) =>
    prisma.games
      .delete({ where: { idGames } })
      .then(() => true)
      .catch(() => false),
  deleteStore: ({ idStores }) =>
    prisma.stores
      .delete({ where: { idStores } })
      .then(() => true)
      .catch(() => false),
  deleteStock: ({ idStock }) =>
    prisma.stock
      .delete({ where: { idStock } })
      .then(() => true)
      .catch(() => false),
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
  console.log("🚀 Server ready at http://localhost:4000/graphql")
);
