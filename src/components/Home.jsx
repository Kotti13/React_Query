import React, { useEffect,useState } from "react";
import {
  Card,
  Typography,
  Alert,
  List,
  Button,
  Statistic,
  Row,
  Col,
} from "antd";
import { NavLink } from "react-router-dom";
import { DatabaseOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
import '../assets/css/Loaders.css'



function Home() {


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="illusion"></div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center mt-[90px] px-4">
      <Card
        className=" w-full max-w-4xl text-center"
        title={
          <Title
            level={2}
            className="text-blue-800 p-4 text-balance font-bold "
          >
            Welcome to React Query App
          </Title>
        }
      >
        <Paragraph className="text-gray-500 text-lg mb-4 font-bold">
          Learn how to fetch data using Regular Fetching and React Query
          (TanStack Query) with real-time loading, caching, and error handling.
        </Paragraph>

        <Alert
          message="Tip"
          description="React Query is better for caching, background fetching, and reducing loading states!"
          type="info"
          showIcon
          className="mb-6"
        />

        <Row gutter={16} justify="center" className="mb-6">
          <Col>
            <Statistic
              title="Users (Sample)"
              value={42}
              prefix={<DatabaseOutlined />}
            />
          </Col>
          <Col>
            <Statistic
              title="Cached Queries"
              value={5}
              prefix={<ThunderboltOutlined />}
            />
          </Col>
        </Row>

        <List
          size="large"
          header={
            <div className="font-semibold text-blue-700">App Features</div>
          }
          bordered
          dataSource={[
            "🌐 Regular Fetch using useEffect",
            "⚡ React Query with caching & auto-refetch",
            "🧪 Axios or fetch supported",
            "📊 Ant Design UI components integrated",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          className="text-left mb-6"
        />

        <NavLink to="/react-query-fetch">
          <Button type="primary" size="large">
            Go to React Query Fetch Page
          </Button>
        </NavLink>
      </Card>
    </div>
  );
}

export default Home;
