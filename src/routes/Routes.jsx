import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      //   {
      //     path: "/",
      //     element: <Home />,
      //   },
      //   {
      //     path: "/",
      //     element: <Home />,
      //   },
    ],
  },
]);