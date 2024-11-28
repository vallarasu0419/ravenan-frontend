import { useRoutes } from "react-router-dom";
import RegisterForm from "./pages//registerForm/RegisterForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import CreateTask from "./pages/screen/CreateTask";
import ViewUser from "./pages/screen/ViewUser";
import Login from "./pages/login/Login";
import ViewTask from "./pages/screen/ViewTask";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboardLayout",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <ViewUser /> },
        { path: "createTask", element: <CreateTask /> },
        { path: "viewTask", element: <ViewTask /> },
      ],
    },
  ]);
}
