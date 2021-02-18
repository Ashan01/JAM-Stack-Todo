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
   const { loading, error, data } = useQuery(GET_TODOS);

   if (loading) return <h2>Loading..</h2>;

   if (error) {
      console.log(error);
      return <h2>Error</h2>;
   }

   console.log(data);
   return (
      <div>
         <h1>Hello World</h1>
      </div>
   );
}
