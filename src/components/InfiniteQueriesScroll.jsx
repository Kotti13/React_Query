import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=5&skip=${(pageParam - 1) * 10}`
  );
  return res.data;
};

const InfiniteQueriesScroll = () => {
 const {
       data,
       error,
       fetchNextPage,
       hasNextPage,
       isFetchingNextPage,
       isLoading,
       isError,
     } = useInfiniteQuery({
       queryKey: ["products"],
       queryFn: fetchProducts,
       getNextPageParam: (lastPage, pages) => {
         if (!lastPage || !Array.isArray(pages)) return undefined;
 
         const totalPages = Math.ceil(lastPage.total / 10);
 
         return pages.length < totalPages ? pages.length + 1 : undefined;
       },
     });
       
 
   if (isLoading) return <p className="text-center">Loading...</p>;
   if (isError)
     return <p className="text-center text-red-500">Error: {error.message}</p>;
 
   return (
     <div className="w-full px-4 sm:px-6 lg:px-10">
       <h2 className="text-center text-3xl font-bold text-blue-500 hover:text-blue-700 my-6">
        Scroll to Load More Products
       </h2>
 
       {data?.pages.map((page, pageIndex) => (
         <React.Fragment key={pageIndex}>
           {page.products.map((item) => (
             <div
               key={item.id}
               className="w-full bg-white p-6 mb-6 rounded-2xl shadow-md hover:shadow-lg flex flex-col lg:flex-row items-start lg:items-center gap-6"
             >
               <img
                 src={item.images[0]}
                 alt={item.title}
                 className="w-full lg:w-[250px] h-[200px] object-cover rounded-xl"
               />
               <div className="flex-1">
                 <p className="text-2xl font-bold text-gray-800 mb-3">
                   {item.title}
                 </p>
                 <p className="text-gray-700">{item.description}</p>
               </div>
             </div>
           ))}
         </React.Fragment>
       ))}
 
       <div className="flex justify-center mt-6">
         {hasNextPage ? (
           <button
             onClick={() => fetchNextPage()}
             disabled={isFetchingNextPage}
             className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
           >
             {isFetchingNextPage ? "Loading more..." : "Load More"}
           </button>
         ) : (
           <p className="text-center text-gray-500">No more products to load.</p>
         )}
       </div>
     </div>
   );
};

export default InfiniteQueriesScroll;
