import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Createjobs from "../Pages/Createjobs";
import MyJob from "../Pages/MyJob";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import Signup from "../components/Singup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children :[
        {
            path: "/",
            element : <Home/>
        },
        {
          path: "/post-job",
          element : <Createjobs/>
      },
      {
        path: "/my-job",
        element : <MyJob/>
    },
    {
      path: "/edit-job/:id",
      element: <UpdateJob />,
      loader:({ params})=> fetch(`http://localhost:8000/all-jobs/${params.id}`,{credentials:"include"})
    },
    {
      path: "/job/:id",
      element: <JobDetails/>
    },

    ]
    
  },
  {
    path: "/login",
    element : <Login/>,
    
  },
  {
    path: "/signup",
    element : <Signup/>,
    
  },
]);

export default router;
