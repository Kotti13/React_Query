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
  const [data, setData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [delayLoader, setDelayLoader] = useState(true);

  // Show illusion loader for first 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch API after fake loader
  useEffect(() => {
    if (!delayLoader) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setData(response.data);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchUsers();
    }
  }, [delayLoader]);

  // Show illusion loader for first 2 seconds
  if (delayLoader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="illusion"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold text-blue-500 hover:text-blue-700">
        Regular Fetch
      </h1>

      {fetchLoading && <p className="loader"></p>}
      {fetchError && (
        <p className="text-center text-red-500">Error: {fetchError}</p>
      )}

      {!fetchLoading && !fetchError && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={{
            pageSize: 7,
            position: ["bottomCenter"],
            className: "custom-pagination",
          }}
          bordered
          size="middle"
          className="*:hover:text-blue-700 p-5"
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
