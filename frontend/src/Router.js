import App from "./App";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./login-page/LoginPage";
import RegisterPage from "./register-page/RegisterPage";
import NotFoundPage from "./not-found-page/NotFoundPage";
import TasksPage from "./tasks-page/TasksPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/tasks",
                element: <TasksPage/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
])