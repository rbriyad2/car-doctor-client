import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Blog from "../pages/Blog/Blog";
import Checkout from "../pages/Checkout/Checkout";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <Signup></Signup>
        },
        {
          path: '/blog',
          element: <Blog></Blog>
        },
        {
          path: '/checkout/:id',
          element: <PrivateRoutes><Checkout></Checkout></PrivateRoutes>,
          loader: ({params})=> fetch(`https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/services/${params.id}`)
        },
        {
          path: '/bookings',
          element: <PrivateRoutes><Bookings></Bookings></PrivateRoutes>
        }
      ]
    },
  ]);

  export default router;