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
        element: <Donate />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
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
    ],
  },
]);

export default router;