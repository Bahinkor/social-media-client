import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import Page from "./pages/page/Page.jsx";

const routes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    { path: "/auth/forget-password", element: <ForgetPassword /> },
    { path: "/auth/reset-password/:token", element: <ResetPassword /> },
    { path: "/page/:userID", element: <Page /> },
];

export default routes;