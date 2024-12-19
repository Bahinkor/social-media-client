import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import apiClient from "./../configs/axios.jsx";
import { getCookie } from "./../utils/getCookie.jsx";
import "./App.css";

function App() {
  useEffect(() => {
    const locationUrl = window.location.pathname;

    if (!locationUrl.includes("/auth/")) {
      if (!window.localStorage.getItem("id")) {
        window.localStorage.clear();
        window.location.href = "/auth/register";

        return;
      }

      const verifyAccessToken = async () => {
        const refreshToken = getCookie("refresh-token");

        try {
          await apiClient.put("/auth/refresh", {
            refreshToken,
          });
        } catch (err) {
          document.cookie = "";
          window.localStorage.clear();
          window.location.href = "/auth/register";
        }
      };

      verifyAccessToken();
    }
  }, []);

  const router = useRoutes(routes);

  return <>{router}</>;
}

export default App;
