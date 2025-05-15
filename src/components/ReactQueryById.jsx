import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import '../assets/css/loader.css';
import { Carousel } from "antd";

const contentStyle = {
  height: "190px",
 
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",

  background: "#364d79",
};

const ReactQueryById = () => {
  const { id } = useParams();
  console.log("id", id);
  


  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3002/products/${id}`);
      return res.data;
    },
  });

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-blue-500 hover:text-blue-700 mb-6">
        React Query By Id
      </h1>

      <Carousel autoplay>
        <div style={{backgroundImage: `url()`, backgroundSize: 'cover', height: '200px'}}>
          <h3 style={contentStyle}></h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>



          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div>
        {isLoading && (
          <div id="page" className="mt-[150px] px-4 ">
            <div id="container" className="w-[80px]">
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="ring"></div>
              <div id="h3">loading</div>
            </div>
          </div>
        )}
        {isError && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}

        {!isLoading && !isError && (
          <div className="flex justify-center items-center mt-8">
            <div className="w-[70%] bg-white  p-8 transition duration-300 hover:shadow-blue-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                {data.title}
              </h2>
              <p className="text-gray-600 mb-4 text-center">
                {data.description}
              </p>
              <p className="text-center text-green-600 font-semibold text-lg">
                Price: ₹{data.price}
              </p>
              <div className="">
                <img
                  src={data.image}
                  alt=""
                  className="h-[140px] mx-auto mt-3 w-[120px]"
                />
              </div>
            </div>
          </div> 
        )}
      </div>
    </>
  );
};

export default ReactQueryById;
