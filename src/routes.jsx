import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import Page from "./pages/page/Page.jsx";
import UploadPost from "./pages/uploadPost/UploadPost.jsx";
import EditProfile from "./pages/editProfile/EditProfile.jsx";
import Home from "./pages/home/Home.jsx";
import SavedPost from "./pages/savedPost/SavedPost.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/forget-password", element: <ForgetPassword /> },
  { path: "/auth/reset-password/:token", element: <ResetPassword /> },
  { path: "/page/:userID", element: <Page /> },
  { path: "/post", element: <UploadPost /> },
  { path: "/post/save", element: <SavedPost /> },
  { path: "/user/edit-profile", element: <EditProfile /> },
];

export default routes;
