import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, Products } from "../api/Fetchusers";
import { Table } from "antd";
import { Link } from "react-router-dom";
// import "../components/css/Loader.css";

// Define columns once
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    align: "center",
    render: (title, product) => (
      <Link
        to={`/react-query-fetch/${product.id}`}
        className="text-blue-400 hover:text-blue-700"
      >
        {title}
      </Link>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "center",
  },
];


function ReactQueryFetch() {
  const {
    data: postusers,
    isLoading: userloading,
    error: usererror,
    isError: userserror,
  } = useQuery({
    queryKey: ["users"],
      queryFn: fetchUsers,
  
    enabled: false,
  });

  const { data, isLoading, error, isError,isFetching } = useQuery({
    queryKey: ["products"],
      queryFn: Products,
// refetchInterval: 1000,
refetchIntervalInBackground:true,
    enabled: true,
  });

    if (isLoading) {
     console.log(isLoading)
    return <div></div>;
    }

    if (isFetching) {
        console.log("isfetching",isFetching)
    }
    
   

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="mt-[50px] px-4">
      <h1 className="text-center text-3xl font-bold text-blue-800 hover:text-blue-700 mb-6">
        React Query Fetch
      </h1>
    
      <Table
        columns={columns}
        dataSource={data}
        
        rowKey="id"
        pagination={{
          pageSize: 5,
          position: ["bottomCenter"],
          className: "text-center text-blue-500 hover:text-blue-700",
        }}
        bordered
      />
      
   
     
    </div>
  );
}

export default ReactQueryFetch;
