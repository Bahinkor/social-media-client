import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

const routes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
];

export default routes;