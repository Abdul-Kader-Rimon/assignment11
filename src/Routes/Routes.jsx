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
import AllDonationRequest from "../pages/AllDonationRequest/AllDonationRequest";
import AllRequestVolunteer from "../pages/AllDonationRequestVolunteer/AllRequestVolunteer";
import AllPendingRequest from "../pages/AllPendingRequest/AllPendingRequest";
import ErrorPage from "../components/Errorpage/Errorpage";
import PublicRoute from "./PublicRoute";
import About from "../components/AdditionalPages/About";
import Contact from "../components/AdditionalPages/Contact";
import Blog from "../components/AdditionalPages/Blog";
import BlogPost from "../components/AdditionalPages/BlogPost";
import HelpSupport from "../components/AdditionalPages/HelpSupport";
import Privacy from "../components/AdditionalPages/Privacy";
import Terms from "../components/AdditionalPages/Terms";
import DonationRequestDetails from "../pages/Home/DonationRequestDetails";
 


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
        element:<PublicRoute>
          <Login />
        </PublicRoute>
          ,
      },
      {
        path: "/register",
        element:<PublicRoute>
          <Register />
        </PublicRoute> ,
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
      {
        path: "/all-pending-request",
        element: <AllPendingRequest />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/help-support",
        element: <HelpSupport />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/donation-request/:id",
        element: <DonationRequestDetails />,
      },
      {
        path: "*",
        element: <ErrorPage />,
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
        path: "all-request",
        element: <AllDonationRequest />,
      },
      {
        path: "all-request-volunteer",
        element: <AllRequestVolunteer />,
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