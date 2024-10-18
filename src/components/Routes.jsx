import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TrackerGuard from "./TrackerGuard";
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import LandingPage from "./LandingPage";
import StomachStatus from "./form/StomachStatus";
import IngredientTracking from "./form/IngredientTracking";
import EditProfile from "./EditProfile";
import GettingStartedName from "./form/GettingStartedName";
import GettingStartedDisease from "./form/GettingStartedDisease";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          index: true,
          element: (
            <TrackerGuard>
              <Home />
            </TrackerGuard>
          ),
        },
        {
          path: "landing",
          element: <LandingPage />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "getting-started-name",
          element: <GettingStartedName />,
        },
        {
          path: "edit-profile",
          element: <EditProfile />,
        },
        {
          path: "getting-started-disease",
          element: <GettingStartedDisease />,
        },
        {
          path: "stomach-status",
          element: <StomachStatus />,
        },
        {
          path: "ingredient-tracking",
          element: <IngredientTracking />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
