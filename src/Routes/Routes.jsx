import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayOut from "../DashboardLayOut/DashboardLayOut";
import MainDashboard from "../pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../pages/Dashboard/MyRequest/MyRequest";
import Donate from "../pages/Donate/Donate";
import PaymentSuccess from "../pages/PaymentSucces/PaymentSuccess";
import SearchRequest from "../pages/SearchRequest/SearchRequest";
import ProfilePage from "../pages/Dashboard/Profile/ProfilePage";
import ViewDetails from "../pages/Dashboard/ViewDetails/ViewDetails";
import EditRequest from "../pages/Dashboard/EditRequest/EditRequest";
 


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/search",
        element: <SearchRequest />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayOut />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MainDashboard />,
      },
      {
        path: "add-request",
        element: <AddRequest />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "my-request",
        element: <MyRequest />,
      },
      {
        path: "/dashboard/view-details/:id",
        element: <ViewDetails />,
      },
      {
        path: "/dashboard/edit-request/:id",
        element: <EditRequest />,
      },
      {
        path: "my-profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;