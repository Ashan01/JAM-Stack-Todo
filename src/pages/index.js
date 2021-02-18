import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function Home() {
   const GET_TODOS = gql`
      {
         todos {
            id
            task
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
   // const handleSubmit = () => {
   //    addTodos({
   //       variables: {
   //          task: inputText.value,
   //       },
   //       refetchQueries: [{ query: GET_TODOS }],
   //    });
   //    inputText.value = "";
   // };

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
      </div>
   );
}
