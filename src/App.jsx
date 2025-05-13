import React from "react";
import {
  NavLink,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import RegularFetch from "./components/RegularFetch";
import ReactQueryFetch from "./components/ReactQueryFetch";
import { Menu } from "antd";
import "./App.css";
import "./index.css";
import { House, Database, DatabaseZap,SquareMousePointer ,Rows4} from "lucide-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import ReactQueryById from "./components/ReactQueryById";

const items = [
  {
    label: <NavLink to="/">Home</NavLink>,
    key: "/",
    icon: <House />,
  },
  {
    label: <NavLink to="/regular">Regular Fetch</NavLink>,
    key: "/regular",
    icon: <Database />,
  },
  {
    label: <NavLink to="/react-query-fetch">React Query Fetch</NavLink>,
    key: "/react-query-fetch",
    icon: <DatabaseZap />,
  },
  {
    label: (
      <NavLink to="/react-query-fetch-by-click">
        React Query Fetch By Click
      </NavLink>
    ),
    key: "/react-query-fetch-by-click",
    icon: <SquareMousePointer />,
  },
 
];

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
        className="justify-center gap-x-6 mt-[50px] text-blue-500 hover:text-blue-700"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regular" element={<RegularFetch />} />
        <Route path="/react-query-fetch" element={<ReactQueryFetch />} />
        <Route path="/react-query-fetch-by-click" element={<ReactQueryFetchByClick />} />
        <Route path="/react-query-fetch/:id" element={<ReactQueryById />} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
      <ReactQueryDevtools />
    </BrowserRouter>
    </React.StrictMode>
  );
}
