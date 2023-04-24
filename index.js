// Importation des modules nécessaires
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Définition du schéma GraphQL pour les élèves
const schema = buildSchema(`
  input StudentInput {
    nom: String
    prenom: String
  }

  type Student {
    id: ID!
    nom: String
    prenom: String
  }

  type Query {
    getStudent(id: ID!): Student
    getAllStudents: [Student]
  }

  type Mutation {
    createStudent(input: StudentInput): Student
    updateStudent(id: ID!, input: StudentInput): Student
    deleteStudent(id: ID!): Student
  }
`);

// Stockage des élèves
const students = [];

// Fonctions de gestion des requêtes GraphQL
const root = {
  // Récupérer un élève par ID
  getStudent: ({ id }) => students.find((student) => student.id === id),

  // Récupérer tous les élèves
  getAllStudents: () => students,

  // Créer un nouvel élève
  createStudent: ({ input }) => {
    const id = Date.now().toString();
    const student = { id, ...input };
    students.push(student);
    return student;
  },

  // Mettre à jour un élève existant
  updateStudent: ({ id, input }) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) {
      throw new Error('Élève introuvable');
    }
    const updatedStudent = { ...students[index], ...input };
    students[index] = updatedStudent;
    return updatedStudent;
  },

  // Supprimer un élève
  deleteStudent: ({ id }) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) {
      throw new Error('Élève introuvable');
    }
    const removedStudent = students.splice(index, 1)[0];
    return removedStudent;
  },
};

// Configuration du serveur Express
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Démarrage du serveur
app.listen(4000, () => console.log('Serveur en écoute sur http://localhost:4000/graphql'));
