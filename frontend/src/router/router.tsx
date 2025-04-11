import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/layout";
import Taskforms from "../component/taskforms";
import Tasks from "../component/tasks";
import Taskone from "../component/taskone";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
  
  
        {
          path: "",
          element: <Tasks />,
        },
        {
          path: "task",
          element: <Tasks />,
        },
        {
          path: "taksforms",
          element: <Taskforms />,
        },
        {
          path: "taskone/:id",
          element: <Taskone />,
        },

  
      ]
    },
  
    
  ]);