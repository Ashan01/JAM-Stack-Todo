import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function Home() {
   const GET_TODOS = gql`
      {
         todos {
            id
            task
            status
         }
      }
   `;

   const ADD_TODO = gql`
      mutation addTodos($task: String!) {
         addTodos(task: $task) {
            task
         }
      }
   `;

   let inputText;

   const [addTodos] = useMutation(ADD_TODO);
   const handleSubmit = () => {
      addTodos({
         variables: {
            task: inputText.value,
         },
         refetchQueries: [{ query: GET_TODOS }],
      });
      inputText.value = "";
   };

   const { loading, error, data } = useQuery(GET_TODOS);

   if (loading) return <h2>Loading..</h2>;

   if (error) {
      console.log(error);
      return <h2>Error</h2>;
   }

   console.log(data);
   return (
      <div>
         <input
            type="text"
            ref={(node) => {
               inputText = node;
            }}
         />
         <button onClick={handleSubmit}>Add</button>
         <br /> <br />
         <h3>My TODO LIST</h3>
         <table border="2">
            <thead>
               <tr>
                  <th>ID</th>
                  <th> TASK </th>
                  <th> STATUS </th>
               </tr>
            </thead>
            <tbody>
               {data.todos.map((todo) => {
                  return (
                     <tr key={todo.id}>
                        <td> {todo.id} </td>
                        <td> {todo.task} </td>
                        <td> {todo.status.toString()} </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
