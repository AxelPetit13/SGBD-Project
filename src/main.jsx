import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Home from "./pages/home.jsx";
import Games from "./pages/games.jsx";
import Players from "./pages/players.jsx";
import Comments from "./pages/comments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/players",
        element: <Players />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/comments",
        element: <Comments />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
