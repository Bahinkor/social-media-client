import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";

const routes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    { path: "/auth/forget-password", element: <ForgetPassword /> },
];

export default routes;