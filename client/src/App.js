import Login from "./pages/login/Login";
import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {

  const {user} = useContext(AuthContext)

  const Layout = () =>(
    <div>
          <Navbar />
          <div style={{display:"flex"}}>
            <Leftbar style={{flex:"2"}}/>
           <div style={{flex:"4"}}>
                <Outlet />
           </div>
            <Rightbar style={{flex:"3"}}/>
          </div>
    </div>
  )

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <ProtectedRoute>
           <Layout />
        </ProtectedRoute>
      ),
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/profile/:id",
          element:<Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
