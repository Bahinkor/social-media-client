import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import apiClient from "./../configs/axios.jsx";
import "./App.css";

function App() {
  const [mainUser, setMainUser] = useState(window.localStorage.getItem("id"));

  useEffect(() => {
    const locationUrl = window.location.pathname;

    if (!locationUrl.includes("/auth/")) {
      if (!mainUser) {
        window.localStorage.clear();
        window.location.href = "/auth/login";
      }

      const verifyAccessToken = async () => {
        try {
          await apiClient.put("/auth/refresh");
        } catch (err) {
          document.cookie = "";
          window.localStorage.clear();
          window.location.href = "/auth/login";
        }
      };

      verifyAccessToken();
    }
  }, []);

  const router = useRoutes(routes);

  return <>{router}</>;
}

export default App;
