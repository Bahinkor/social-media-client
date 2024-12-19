import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import apiClient from "../../../configs/axios.jsx";
import swal from "sweetalert2";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function Register() {
  // state
  const [password, setPassword] = useState("");

  // ref
  const passwordFocus = useRef(null);

  // params
  const { token } = useParams();

  // useEffect
  useEffect(() => {
    if (window.localStorage.getItem("id")) {
      window.location.href = "/";
    }

    passwordFocus.current.focus();
  }, []);

  // func
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      password,
      token,
    };

    if (password.length < 6) {
      new swal({
        title: "Warning!",
        icon: "warning",
        text: "The password must be longer than 6 characters.",
        button: "ok",
      });
    }

    try {
      const res = await apiClient.post("/auth/reset-password", userData);

      if (res.status === 200) {
        new swal({
          title: "Success",
          icon: "success",
          text: "Reset password successfully.",
          button: "ok",
        });

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      }
    } catch (err) {
      if (err.response.status === 500) {
        new swal({
          title: "Error",
          icon: "error",
          text: "Internal Server Error! Try again later.",
          button: "ok",
        });
      } else {
        new swal({
          title: "Error",
          icon: "error",
          text: "Token not valid or expired.",
          button: "ok",
        });
      }
    }
  };

  return (
    <>
      {/* start meta tag */}
      <Helmet>
        <title>Social Media | Reset password</title>
      </Helmet>
      {/* finish meta tag */}

      <div className="auth-page">
        <section id="auth-container">
          <form id="auth-form" action="#" onSubmit={submitHandler}>
            <header>
              <h2 className="text-3xl">Reset Password 🎃</h2>
            </header>

            <main className="mt-10">
              <div className="auth-input-card">
                <label htmlFor="login_email" className="font-Poppins-Medium">
                  New Password
                </label>
                <div className="relative flex input-card items-center">
                  <input
                    id="login_email"
                    type="password"
                    className="auth-input"
                    placeholder="Please enter the new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordFocus}
                  />
                  <span className="absolute left-2 top-4 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </main>

            <footer className="mt-4">
              <button className="bg-indigo-700 text-white rounded-sm">
                Continue
              </button>
            </footer>
          </form>
        </section>

        <div className="image-bg"></div>
      </div>
    </>
  );
}
