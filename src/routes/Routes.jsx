import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddJob from "../pages/AddJob/AddJob";
import Home from "../pages/Home/Home";
import UpdateJob from "../pages/Home/UpdateJob/UpdateJob";
import JobDetails from "../pages/JobDetails/JobDetails";
import Login from "../pages/Login/Login";
import MyBids from "../pages/MyBids";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import Registration from "../pages/RegisTration/RegisTration";
import PrivateRoute from "./PrivateRoute";
import BidRequests from "../pages/BidRequest/BidRequest";

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
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/my-posted-jobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-job",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "/bid-request",
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
