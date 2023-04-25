const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { PrismaClient } = require('@prisma/client');

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
    editor: Editor!
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
    allGames: [Game!]!
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
  allEditors: () => prisma.editor.findMany(),
  allGames: () => prisma.game.findMany(),
  allStocks: () => prisma.stock.findMany(),
  allStores: () => prisma.store.findMany(),
  
  createEditor: ({ nameEditors }) => prisma.editor.create({ data: { nameEditors } }),
  createGame: ({ nameGames, idEditors }) => prisma.game.create({ data: { nameGames, editor: { connect: { idEditors } } } }),
  createStore: ({ nameStores }) => prisma.store.create({ data: { nameStores } }),
  createStock: ({ idGames, idStores, units, prices }) => prisma.stock.create({ data: { game: { connect: { idGames } }, store: { connect: { idStores } }, units, prices } }),

  updateEditor: ({ idEditors, nameEditors }) => prisma.editor.update({ where: { idEditors }, data: { nameEditors } }),
  updateGame: ({ idGames, nameGames, idEditors }) => prisma.game.update({ where: { idGames }, data: { nameGames, editor: idEditors ? { connect: { idEditors } } : undefined } }),
  updateStore: ({ idStores, nameStores }) => prisma.store.update({ where: { idStores }, data: { nameStores } }),
  updateStock: ({ idStock, idGames, idStores, units, prices }) => prisma.stock.update({ where: { idStock }, data: { game: idGames ? { connect: { idGames } } : undefined, store: idStores ? { connect: { idStores } } : undefined, units, prices } }),

  deleteEditor: ({ idEditors }) => prisma.editor.delete({ where: { idEditors } }).then(() => true).catch(() => false),
  deleteGame: ({ idGames }) => prisma.game.delete({ where: { idGames } }).then(() => true).catch(() => false),
  deleteStore: ({ idStores }) => prisma.store.delete({ where: { idStores } }).then(() => true).catch(() => false),
  deleteStock: ({ idStock }) => prisma.stock.delete({ where: { idStock } }).then(() => true).catch(() => false),

};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(4000, () => console.log('🚀 Server ready at http://localhost:4000/graphql'));
