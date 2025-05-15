import axios from "axios";
import React from "react";

export const fetchUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const Products = async () => {
  const response = await axios.get("http://localhost:3002/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`http://localhost:3002/products/${id}`);
  return response.data;
};
