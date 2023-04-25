const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const schema = buildSchema(`
  type Matiere {
    idMatiere: ID!
    nomMatiere: String!
    coefficientMatiere: Int!
    notes: [Note]
    groupeMatieres: [GroupeMatiere]
    cours: [Cours]
  }

  type Groupe {
    idGroupe: ID!
    nomGroupe: String!
    etudiants: [Etudiant]
    groupeMatieres: [GroupeMatiere]
  }

  type Etudiant {
    idEtudiant: ID!
    nomEtudiant: String!
    prenomEtudiant: String!
    emailEtudiant: String!
    mdpEtudiant: String!
    groupe: Groupe
    notes: [Note]
    coursEtudiants: [CoursEtudiants]
    absences: [Absence]
    presences: [Presence]
  }

  type Note {
    idNote: ID!
    matiere: Matiere
    etudiant: Etudiant
    noteNote: Float!
  }

  type Professeur {
    idProfesseur: ID!
    nomProfesseur: String!
    prenomProfesseur: String!
    emailProfesseur: String!
    mdpProfesseur: String!
    cours: [Cours]
  }

  type Salle {
    idSalle: ID!
    nomSalle: String!
    capaciteSalle: Int!
    cours: [Cours]
  }

  type Cours {
    idCours: ID!
    professeur: Professeur
    salle: Salle
    matiere: Matiere
    dateCours: String!
    heureDebutCours: String!
    heureFinCours: String!
    coursEtudiants: [CoursEtudiants]
    absences: [Absence]
    presences: [Presence]
  }

  type CoursEtudiants {
    cours: Cours
    etudiant: Etudiant
  }

  type Absence {
    idAbsence: ID!
    etudiant: Etudiant
    cours: Cours
    dateAbsence: String!
  }

  type Presence {
    idPresence: ID!
    etudiant: Etudiant
    cours: Cours
    datePresence: String!
  }

  type GroupeMatiere {
    idGroupeMatiere: ID!
    groupe: Groupe
    matiere: Matiere
  }

  type Query {
    matiere(idMatiere: ID!): Matiere
    matieres: [Matiere]
  
    groupe(idGroupe: ID!): Groupe
    groupes: [Groupe]
  
    etudiant(idEtudiant: ID!): Etudiant
    etudiants: [Etudiant]
  
    note(idNote: ID!): Note
    notes: [Note]
  
    professeur(idProfesseur: ID!): Professeur
    professeurs: [Professeur]
  
    salle(idSalle: ID!): Salle
    salles: [Salle]
  
    cours(idCours: ID!): Cours
    coursList: [Cours]
  
    absence(idAbsence: ID!): Absence
    absences: [Absence]
  
    presence(idPresence: ID!): Presence
    presences: [Presence]
  
    groupeMatiere(idGroupeMatiere: ID!): GroupeMatiere
    groupeMatieres: [GroupeMatiere]
  }

  type Mutation {
    createMatiere(nomMatiere: String!, coefficientMatiere: Int!): Matiere
    updateMatiere(idMatiere: ID!, nomMatiere: String, coefficientMatiere: Int): Matiere
    deleteMatiere(idMatiere: ID!): Matiere
  
    createGroupe(nomGroupe: String!): Groupe
    updateGroupe(idGroupe: ID!, nomGroupe: String): Groupe
    deleteGroupe(idGroupe: ID!): Groupe
  
    createEtudiant(nomEtudiant: String!, prenomEtudiant: String!, emailEtudiant: String!, mdpEtudiant: String!, groupeId: ID!): Etudiant
    updateEtudiant(idEtudiant: ID!, nomEtudiant: String, prenomEtudiant: String, emailEtudiant: String, mdpEtudiant: String, groupeId: ID): Etudiant
    deleteEtudiant(idEtudiant: ID!): Etudiant
  
    createNote(matiereId: ID!, etudiantId: ID!, noteNote: Float!): Note
    updateNote(idNote: ID!, matiereId: ID, etudiantId: ID, noteNote: Float): Note
    deleteNote(idNote: ID!): Note
  
    createProfesseur(nomProfesseur: String!, prenomProfesseur: String!, emailProfesseur: String!, mdpProfesseur: String!): Professeur
    updateProfesseur(idProfesseur: ID!, nomProfesseur: String, prenomProfesseur: String, emailProfesseur: String, mdpProfesseur: String): Professeur
    deleteProfesseur(idProfesseur: ID!): Professeur
  
    createSalle(nomSalle: String!, capaciteSalle: Int!): Salle
    updateSalle(idSalle: ID!, nomSalle: String, capaciteSalle: Int): Salle
    deleteSalle(idSalle: ID!): Salle

    createCours(professeurId: ID!, salleId: ID!, matiereId: ID!, dateCours: String!, heureDebutCours: String!, heureFinCours: String!): Cours
    updateCours(idCours: ID!, professeurId: ID, salleId: ID, matiereId: ID, dateCours: String, heureDebutCours: String, heureFinCours: String): Cours
    deleteCours(idCours: ID!): Cours
  
    createCoursEtudiants(coursId: ID!, etudiantId: ID!): CoursEtudiants
    deleteCoursEtudiants(coursId: ID!, etudiantId: ID!): CoursEtudiants
  
    createAbsence(etudiantId: ID!, coursId: ID!, dateAbsence: String!): Absence
    updateAbsence(idAbsence: ID!, etudiantId: ID, coursId: ID, dateAbsence: String): Absence
    deleteAbsence(idAbsence: ID!): Absence
  
    createPresence(etudiantId: ID!, coursId: ID!, datePresence: String!): Presence
    updatePresence(idPresence: ID!, etudiantId: ID, coursId: ID, datePresence: String): Presence
    deletePresence(idPresence: ID!): Presence
  
    createGroupeMatiere(groupeId: ID!, matiereId: ID!): GroupeMatiere
    updateGroupeMatiere(idGroupeMatiere: ID!, groupeId: ID, matiereId: ID): GroupeMatiere
    deleteGroupeMatiere(idGroupeMatiere: ID!): GroupeMatiere
  }
`);

const rootValue = {
  // Créations
  createMatiere: async ({ nomMatiere, coefficientMatiere }) => {
    return await prisma.matiere.create({
      data: {
        nomMatiere,
        coefficientMatiere,
      },
    });
  },

  createGroupe: async ({ nomGroupe }) => {
    return await prisma.groupe.create({
      data: {
        nomGroupe,
      },
    });
  },

  createEtudiant: async ({ nomEtudiant, prenomEtudiant, emailEtudiant, mdpEtudiant, idGroupe }) => {
    return await prisma.etudiant.create({
      data: {
        nomEtudiant,
        prenomEtudiant,
        emailEtudiant,
        mdpEtudiant,
        groupe: {
          connect: {
            idGroupe: parseInt(idGroupe),
          },
        },
      },
    });
  },

  createNote: async ({ noteNote, idMatiere, idEtudiant }) => {
    return await prisma.note.create({
      data: {
        noteNote,
        matiere: {
          connect: {
            idMatiere: parseInt(idMatiere),
          },
        },
        etudiant: {
          connect: {
            idEtudiant: parseInt(idEtudiant),
          },
        },
      },
    }); 
  },

  createProfesseur: async ({ nomProfesseur, prenomProfesseur, emailProfesseur, mdpProfesseur }) => {
    return await prisma.professeur.create({
      data: {
        nomProfesseur,
        prenomProfesseur,
        emailProfesseur,
        mdpProfesseur,
      },
    });
  },

  createSalle: async ({ nomSalle, capaciteSalle }) => {
    return await prisma.salle.create({
      data: {
        nomSalle,
        capaciteSalle,
      },
    });
  },

  createCours: async ({ idProfesseur, idSalle, idMatiere, dateCours, heureDebutCours, heureFinCours }) => {
    return await prisma.cours.create({
      data: {
        professeur: {
          connect: {
            idProfesseur: parseInt(idProfesseur),
          },
        },
        salle: {
          connect: {
            idSalle: parseInt(idSalle),
          },
        },
        matiere: {
          connect: {
            idMatiere: parseInt(idMatiere),
          },
        },
        dateCours,
        heureDebutCours,
        heureFinCours,
      },
    });
  },

  createCoursEtudiants: async ({ idCours, idEtudiant }) => {
    return await prisma.coursEtudiants.create({
      data: {
        cours: {
          connect: {
            idCours: parseInt(idCours),
          },
        },
        etudiant: {
          connect: {
            idEtudiant: parseInt(idEtudiant),
          },
        },
      },
    });
  },

  createAbsence: async ({ idEtudiant, idCours, dateAbsence }) => {
    return await prisma.absence.create({
      data: {
        etudiant: {
          connect: {
            idEtudiant: parseInt(idEtudiant),
          },
        },
        cours: {
          connect: {
            idCours: parseInt(idCours),
          },
        },
        dateAbsence,
      },
    });
  },

  createPresence: async ({ idEtudiant, idCours, datePresence }) => {
    return await prisma.presence.create({
      data: {
        etudiant: {
          connect: {
            idEtudiant: parseInt(idEtudiant),
          },
        },
        cours: {
          connect: {
            idCours: parseInt(idCours),
          },
        },
        datePresence,
      },
    });
  },

  createGroupeMatiere: async ({ idGroupe, idMatiere }) => {
    return await prisma.groupeMatiere.create({
      data: {
        groupe: {
          connect: {
            idGroupe: parseInt(idGroupe),
          },
        },
        matiere: {
          connect: {
            idMatiere: parseInt(idMatiere),
          },
        },
      },
    });
  },

  // Lectures uniques
  matiere: async ({ idMatiere }) => {
    return await prisma.matiere.findUnique({
      where: {
        idMatiere: parseInt(idMatiere),
      },
    });
  },

  groupe: async ({ idGroupe }) => {
    return await prisma.groupe.findUnique({
      where: {
        idGroupe: parseInt(idGroupe),
      },
    });
  },

  etudiant: async ({ idEtudiant }) => {
    return await prisma.etudiant.findUnique({
      where: {
        idEtudiant: parseInt(idEtudiant),
      },
    });
  },

  note: async ({ idNote }) => {
    return await prisma.note.findUnique({
      where: {
        idNote: parseInt(idNote),
      },
    });
  },

  professeur: async ({ idProfesseur }) => {
    return await prisma.professeur.findUnique({
      where: {
        idProfesseur: parseInt(idProfesseur),
      },
    });
  },

  salle: async ({ idSalle }) => {
    return await prisma.salle.findUnique({
      where: {
        idSalle: parseInt(idSalle),
      },
    });
  },

  cours: async ({ idCours }) => {
    return await prisma.cours.findUnique({
      where: {
        idCours: parseInt(idCours),
      },
    });
  },

  coursEtudiants: async ({ idCoursEtudiants }) => {
    return await prisma.coursEtudiants.findUnique({
      where: {
        idCoursEtudiants: parseInt(idCoursEtudiants),
      },
    });
  },

  absence: async ({ idAbsence }) => {
    return await prisma.absence.findUnique({
      where: {
        idAbsence: parseInt(idAbsence),
      },
    });
  },

  presence: async ({ idPresence }) => {
    return await prisma.presence.findUnique({
      where: {
        idPresence: parseInt(idPresence),
      },
    });
  },

  groupeMatiere: async ({ idGroupeMatiere }) => {
    return await prisma.groupeMatiere.findUnique({
      where: {
        idGroupeMatiere: parseInt(idGroupeMatiere),
      },
    });
  },

  // Lectures complètes
  matieres: async () => {
    return await prisma.matiere.findMany();
  },

  groupes: async () => {
    return await prisma.groupe.findMany();
  },

  etudiants: async () => {
    return await prisma.etudiant.findMany();
  },

  notes: async () => {
    return await prisma.note.findMany();
  },

  professeurs: async () => {
    return await prisma.professeur.findMany();
  },

  salles: async () => {
    return await prisma.salle.findMany();
  },

  cours: async () => {
    return await prisma.cours.findMany();
  },

  coursEtudiants: async () => {
    return await prisma.coursEtudiants.findMany();
  },

  absences: async () => {
    return await prisma.absence.findMany();
  },

  presences: async () => {
    return await prisma.presence.findMany();
  },

  groupeMatieres: async () => {
    return await prisma.groupeMatiere.findMany();
  },

  // Updates
  updateMatiere: async ({ idMatiere, nomMatiere, coefficientMatiere }) => {
    return await prisma.matiere.update({
      where: {
        idMatiere: parseInt(idMatiere),
      },
      data: {
        nomMatiere,
        coefficientMatiere,
      },
    });
  },

  updateGroupe: async ({ idGroupe, nomGroupe }) => {
    return await prisma.groupe.update({
      where: {
        idGroupe: parseInt(idGroupe),
      },
      data: {
        nomGroupe,
      },
    });
  },

  updateEtudiant: async ({ idEtudiant, nomEtudiant, prenomEtudiant }) => {
    return await prisma.etudiant.update({
      where: {
        idEtudiant: parseInt(idEtudiant),
      },
      data: {
        nomEtudiant,
        prenomEtudiant,
      },
    });
  },

  updateNote: async ({ idNote, note }) => {
    return await prisma.note.update({
      where: {
        idNote: parseInt(idNote),
      },
      data: {
        note,
      },
    });
  },

  updateProfesseur: async ({ idProfesseur, nomProfesseur, prenomProfesseur }) => {
    return await prisma.professeur.update({
      where: {
        idProfesseur: parseInt(idProfesseur),
      },
      data: {
        nomProfesseur,
        prenomProfesseur,
      },
    });
  },

  updateSalle: async ({ idSalle, nomSalle }) => {
    return await prisma.salle.update({
      where: {
        idSalle: parseInt(idSalle),
      },
      data: {
        nomSalle,
      },
    });
  },

  updateCours: async ({ idCours, dateCours, heureDebutCours, heureFinCours }) => {
    return await prisma.cours.update({
      where: {
        idCours: parseInt(idCours),
      },
      data: {
        dateCours,
        heureDebutCours,
        heureFinCours,
      },
    });
  },

  updateCoursEtudiants: async ({ idCoursEtudiants, noteCoursEtudiants }) => {
    return await prisma.coursEtudiants.update({
      where: {
        idCoursEtudiants: parseInt(idCoursEtudiants),
      },
      data: {
        noteCoursEtudiants,
      },
    });
  },

  updateAbsence: async ({ idAbsence, dateAbsence }) => {
    return await prisma.absence.update({
      where: {
        idAbsence: parseInt(idAbsence),
      },
      data: {
        dateAbsence,
      },
    });
  },
  
  updatePresence: async ({ idPresence, datePresence }) => {
    return await prisma.presence.update({
      where: {
        idPresence: parseInt(idPresence),
      },
      data: {
        datePresence,
      },
    });
  },

  updateGroupeMatiere: async ({ idGroupeMatiere, coefficientGroupeMatiere }) => {
    return await prisma.groupeMatiere.update({
      where: {
        idGroupeMatiere: parseInt(idGroupeMatiere),
      },
      data: {
        coefficientGroupeMatiere,
      },
    });
  },

  // Suppressions
  deleteMatiere: async ({ idMatiere }) => {
    return await prisma.matiere.delete({
      where: {
        idMatiere: parseInt(idMatiere),
      },
    });
  },

  deleteGroupe: async ({ idGroupe }) => {
    return await prisma.groupe.delete({
      where: {
        idGroupe: parseInt(idGroupe),
      },
    });
  },

  deleteEtudiant: async ({ idEtudiant }) => {
    return await prisma.etudiant.delete({
      where: {
        idEtudiant: parseInt(idEtudiant),
      },
    });
  },

  deleteNote: async ({ idNote }) => {
    return await prisma.note.delete({
      where: {
        idNote: parseInt(idNote),
      },
    });
  },
  
  deleteProfesseur: async ({ idProfesseur }) => {
    return await prisma.professeur.delete({
      where: {
        idProfesseur: parseInt(idProfesseur),
      },
    });
  },
  
  deleteSalle: async ({ idSalle }) => {
    return await prisma.salle.delete({
      where: {
        idSalle: parseInt(idSalle),
      },
    });
  },

  deleteCours: async ({ idCours }) => {
    return await prisma.cours.delete({
      where: {
        idCours: parseInt(idCours),
      },
    });
  },

  deleteCoursEtudiants: async ({ idCoursEtudiants }) => {
    return await prisma.coursEtudiants.delete({
      where: {
        idCoursEtudiants: parseInt(idCoursEtudiants),
      },
    });
  },

  deleteAbsence: async ({ idAbsence }) => {
    return await prisma.absence.delete({
      where: {
        idAbsence: parseInt(idAbsence),
      },
    });
  },

  deletePresence: async ({ idPresence }) => {
    return await prisma.presence.delete({
      where: {
        idPresence: parseInt(idPresence),
      },
    });
  },

  deleteGroupeMatiere: async ({ idGroupeMatiere }) => {
    return await prisma.groupeMatiere.delete({
      where: {
        idGroupeMatiere: parseInt(idGroupeMatiere),
      },
    });
  },

  // Suppressions multiples
  deleteManyMatiere: async ({ idMatieres }) => {
    return await prisma.matiere.deleteMany({
      where: {
        idMatiere: {
          in: idMatieres,
        },
      },
    });
  },

  deleteManyGroupe: async ({ idGroupes }) => {
    return await prisma.groupe.deleteMany({
      where: {
        idGroupe: {
          in: idGroupes,
        },
      },
    });
  },

  deleteManyEtudiant: async ({ idEtudiants }) => {
    return await prisma.etudiant.deleteMany({
      where: {
        idEtudiant: {
          in: idEtudiants,
        },
      },
    });
  },

  deleteManyNote: async ({ idNotes }) => {
    return await prisma.note.deleteMany({
      where: {
        idNote: {
          in: idNotes,
        },
      },
    });
  },

  deleteManyProfesseur: async ({ idProfesseurs }) => {
    return await prisma.professeur.deleteMany({
      where: {
        idProfesseur: {
          in: idProfesseurs,
        },
      },
    });
  },

  deleteManySalle: async ({ idSalles }) => {
    return await prisma.salle.deleteMany({
      where: {
        idSalle: {
          in: idSalles,
        },
      },
    });
  },

  deleteManyCours: async ({ idCours }) => {
    return await prisma.cours.deleteMany({
      where: {
        idCours: {
          in: idCours,
        },
      },
    });
  },

  deleteManyCoursEtudiants: async ({ idCoursEtudiants }) => {
    return await prisma.coursEtudiants.deleteMany({
      where: {
        idCoursEtudiants: {
          in: idCoursEtudiants,
        },
      },
    });
  },

  deleteManyAbsence: async ({ idAbsences }) => {
    return await prisma.absence.deleteMany({
      where: {
        idAbsence: {
          in: idAbsences,
        },
      },
    });
  },

  deleteManyPresence: async ({ idPresences }) => {
    return await prisma.presence.deleteMany({
      where: {
        idPresence: {
          in: idPresences,
        },
      },
    });
  },

  deleteManyGroupeMatiere: async ({ idGroupeMatieres }) => {
    return await prisma.groupeMatiere.deleteMany({
      where: {
        idGroupeMatiere: {
          in: idGroupeMatieres,
        },
      },
    });
  },
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
