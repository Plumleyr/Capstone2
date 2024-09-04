import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";

const Routes = ({ user }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar user={user} />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home user={user} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
