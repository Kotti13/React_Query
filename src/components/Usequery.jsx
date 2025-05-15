import React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchProductById } from "../api/Fetchusers";
import "../assets/css/Loaders.css";

const MultipleProducts = ({ postIds }) => {
  const postQueries = useQueries({
    queries: postIds.map((id) => ({
      queryKey: ["products", id],
      queryFn: () => fetchProductById(id),
    })),
  });
    
    console.log("postQueries", postQueries);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      {postQueries.map((query, index) => {
        if (query.isLoading) {
          return (
            <div key={index} className="loader my-2">
            
<div class="illusion"></div>

{postIds[index]}
            </div>
          );
        }

        if (query.isError) {
          return (
            <div key={index} className="text-red-500 my-2">
              Error loading product {postIds[index]}: {query.error.message}
            </div>
          );
        }

        const product = query.data;

        return (
          <div
            key={product.id}
            className="border p-4 m-2 w-1/2 bg-blue-100 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-700">Price: ${product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

const Usequerydemo = () => {
  const postIds = [1, 5, 6, 8];

  return (
    <>
      <div className="font-bold text-center mt-6 text-2xl text-blue-500">
        Usequery
      </div>
      <MultipleProducts postIds={postIds} />
    </>
  );
};

export default Usequerydemo;
