import axios from "axios";
import React from "react";

export const fetchUsers = () => {
  const response =  axios.get("https://jsonplaceholder.typicode.com/users");
  return response;
};

export const Products = () => {
  const response =  axios.get("http://localhost:3002/products");
  return response;
};
