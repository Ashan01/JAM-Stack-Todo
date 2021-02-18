const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
   type Query {
      todos: [TodosType!]
   }
   type TodosType {
      id: ID!
      task: String!
      status: Boolean!
   }
`;

const todosList = [
   { id: 2, task: "hey", status: true },
   { id: 3, task: "JK Rowling", status: false },
];

const resolvers = {
   Query: {
      todos: () => {},
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
