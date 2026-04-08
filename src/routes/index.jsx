import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Login";
import Posts from "../components/Posts";
import Logout from "../components/Logout";
import NewPost from "../components/NewPost";
import ExpandPost from "../components/ExpandPost";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: "/create-post",
          element: <NewPost />,
        },
        { path: "/logout", element: <Logout /> },
        {
          path: "/posts/:id",
          element: <ExpandPost />,
        },
        {
          path: "*",
          element: <h1>Invalid Route</h1>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
