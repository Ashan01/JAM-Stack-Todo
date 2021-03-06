const { ApolloServer, gql } = require("apollo-server-lambda");
var faunadb = require("faunadb"),
   q = faunadb.query;

const typeDefs = gql`
   type Query {
      todos: [TodosType!]
   }
   type Mutation {
      addTodos(task: String!): TodosType
   }
   type TodosType {
      id: ID!
      task: String!
      status: Boolean!
   }
`;

const resolvers = {
   Query: {
      todos: async () => {
         try {
            var adminClient = new faunadb.Client({
               secret: "fnAEB3hd3mACCa_qf9kBGxoYuC9Zw7kmHPvz3xSG",
            });
            const result = await adminClient.query(
               q.Map(
                  q.Paginate(q.Match(q.Index("task"))),
                  q.Lambda((x) => q.Get(x))
               )
            );

            return result.data.map((d) => {
               return {
                  id: d.ts,
                  task: d.data.task,
                  status: d.data.status,
               };
            });
         } catch (error) {
            console.log(error);
         }
      },
   },
   Mutation: {
      addTodos: async (_, { task }) => {
         try {
            var adminClient = new faunadb.Client({
               secret: "fnAEB3hd3mACCa_qf9kBGxoYuC9Zw7kmHPvz3xSG",
            });
            const result = await adminClient.query(
               q.Create(q.Collection("todo"), {
                  data: {
                     task: task,
                     status: true,
                  },
               })
            );
            return result.ref.data;
         } catch (err) {
            console.log(err);
         }
      },
   },
};

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

exports.handler = server.createHandler();
