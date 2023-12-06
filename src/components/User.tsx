"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const User = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
  });

  if(isLoading) {
    return (
        <div>Loading...</div>
    )
  }
  console.log(data);
  
  return <div>User</div>;
};

export default User;
