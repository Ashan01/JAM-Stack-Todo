import React, { useRef } from "react";
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
   const ADD_TODO = gql`{
      mutation addTodos($task: String! )=>{
          addTodos(task : $task){
             task
          }
      }
   }`;

   let data = useRef();
   const [addTodos] = useMutation(ADD_TODO);
   const { loading, error, data } = useQuery(GET_TODOS);

   if (loading) return <h2>Loading..</h2>;

   if (error) {
      console.log(error);
      return <h2>Error</h2>;
   }

   console.log(data);

   const handleSubmit = () => {
      return addTodos({
         task: data.current.value,
      });
   };
   return (
      <div>
         <input type="text" ref={data} />
      </div>
   );
}
