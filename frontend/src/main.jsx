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
import People from "./pages/people.jsx";
import PeopleProfil from "./components/people/PeopleProfil.jsx";
import Game from "./components/games/game.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/people",
        element: <People />,
      },
      {
        path: "/people:id",
        element: <PeopleProfil />,
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
        path: "/game:id",
        element: <Game />,
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
