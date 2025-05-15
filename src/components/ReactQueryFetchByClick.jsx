import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, Products } from "../api/Fetchusers";
import { Table } from "antd";
// import "../assets/css/button.css";


const columns = [
    {

        title: "Title",
        dataIndex: "title",
        key: "name",
        align: "center",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "email",
        align: "center",
    },
];


function ReactQueryFetchByClick() {
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: Products,
        enabled: false

    });

    if (isLoading) {
        console.log(isLoading)
        return <div></div>;
    }

    if (isFetching) {
        console.log("isfetching", isFetching)
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
           
            <button className="bg-blue-600 p-3 text-white rounded-lg flex justify-center items-center mx-auto mt-6" onClick={() => refetch()}>Load Data</button>
        </div>
    );
}
export default ReactQueryFetchByClick;