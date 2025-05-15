import axios from "axios";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { LockKeyholeOpen } from "lucide-react";
import { Pagination } from "antd";

const fetchcars = (pageNumber) => {
  return axios.get(
    `https://api.fake-rest.refine.dev/posts?_limit=4&_page=${pageNumber}`
  );
};

const Paginations = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", pageNumber],
    queryFn: () => fetchcars(pageNumber),
    //   keepPreviousData: true,
    placeholderData:keepPreviousData,
  });
  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-center mt-8 mb-6 text-3xl text-blue-600 font-sans">
          Pagination
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {data?.data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-xl text-black">{item._id}</p>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 ">
              {item.title}
            </h3>
            <p className="text-gray-500 font-bold ">Rs.{item.content}</p>
            <img src={item.image[0].url} alt="" />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-x-6">
       

        
      </div>
      <Pagination
        onChange={(pageNumber)=>{setPageNumber(pageNumber)}}
        defaultCurrent={1}
              total={50}
              current={pageNumber}
        className="flex justify-center pb-6"
      />
    </>
  );
};

export default Paginations;
