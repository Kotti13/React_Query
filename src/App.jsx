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
import {
  House,
  Database,
  DatabaseZap,
  SquareMousePointer,
  Rows4,
  ListStart,
  Infinity,Mouse,Braces,HardDriveUpload
} from "lucide-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import ReactQueryById from "./components/ReactQueryById";
import Pagination from "./components/Pagination";
import InfiniteQueries from "./components/InfiniteQueries";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { LockKeyholeOpen } from "lucide-react";
import InfiniteQueriesScroll from "./components/InfiniteQueriesScroll";
import Usequery from "./components/Usequery";
import { useMutation } from "@tanstack/react-query";
import Crud from './components/Crud'

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
  {
    label: <NavLink to="/react-pagination">Pagination</NavLink>,
    key: "/react-pagination",
    icon: <ListStart />,
  },
  {
    label: <NavLink to="/Infinite-fetch">InfiniteQueries</NavLink>,
    key: "/Infinite-fetch",
    icon: <Infinity />,
  },
  {
    label: <NavLink to="/Infinitescroll">Infinitescroll</NavLink>,
    key: "/Infinitescroll",
    icon: <Mouse />,
  },
  {
    label: <NavLink to="/UseQuery">UseQuery</NavLink>,
    key: "/UseQuery",
    icon: <Braces />,
  },
  {
    label: <NavLink to="/UseMutation">UseMutation</NavLink>,
    key: "/UseMutation",
    icon: <HardDriveUpload />,
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
        <Route
          path="/react-query-fetch-by-click"
          element={<ReactQueryFetchByClick />}
        />
        <Route path="/react-query-fetch/:id" element={<ReactQueryById />} />
        <Route path="/react-pagination" element={<Pagination />} />
        <Route path="/Infinite-fetch" element={<InfiniteQueries />} />
        <Route path="/Infinitescroll" element={<InfiniteQueriesScroll />} />
        <Route path="/UseQuery" element={<Usequery />} />
        <Route path="/UseMutation" element={ <Crud/>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppLayout />
        </ErrorBoundary>

        <ReactQueryDevtools />
      </BrowserRouter>
    </React.StrictMode>
  );
}
