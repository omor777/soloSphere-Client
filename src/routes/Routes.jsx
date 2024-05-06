import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddJob from "../pages/AddJob/AddJob";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/RegisTration/RegisTration";

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
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/add-job",
        element: <AddJob />,
      },
    ],
  },
]);
