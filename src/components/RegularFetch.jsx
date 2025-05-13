import React, { useState, useEffect } from "react";
import { Divider, Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
];

function RegularFetch() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchposts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setdata(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center  text-3xl font-bold text-blue-500 hover:text-blue-700 ">
        Regular Fetch
      </h1>

      {loading && <p className="loader"></p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={{
            pageSize: 7,
            position: ["bottomCenter"],
            className: "custom-pagination t",
          }}
          bordered
          size="middle"
          className=" *:hover:text-blue-700 p-5  "
        />
      )}

      <Divider />

      <h2 className="text-center text-2xl font-bold text-blue-500 hover:text-blue-700">
        Regular Fetch
      </h2>
      <p className="text-center">
        This is a simple example of using Axios to fetch data from an API and
        display it in a table.
      </p>
      <p className="text-center">
        You can customize the columns and data as per your requirements.
      </p>
    </div>
  );
}

export default RegularFetch;
