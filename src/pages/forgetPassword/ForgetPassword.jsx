import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import apiClient from "../../../configs/axios.jsx";
import swal from "sweetalert2";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function Register() {
  // state
  const [email, setEmail] = useState("");

  // ref
  const emailFocus = useRef(null);

  // useEffect
  useEffect(() => {
    if (window.localStorage.getItem("id")) {
      window.location.href = "/";
    }

    emailFocus.current.focus();
  }, []);

  // func
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    try {
      const res = await apiClient.post("/auth/forget-password", userData);

      if (res.status === 200) {
        new swal({
          title: "Success",
          icon: "success",
          text: "The password reset link has been successfully sent to your email.",
          button: "ok",
        });

        setEmail("");
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
          text: "Email not found.",
          button: "ok",
        });
      }
    }
  };

  return (
    <>
      {/* start meta tag */}
      <Helmet>
        <title>Social Media | Forget password</title>
      </Helmet>
      {/* finish meta tag */}

      <div className="auth-page">
        <section id="auth-container">
          <form id="auth-form" action="#" onSubmit={submitHandler}>
            <header>
              <h2 className="text-3xl">Forget Password 🛟</h2>
            </header>

            <main className="mt-10">
              <div className="auth-input-card">
                <label htmlFor="login_email" className="font-Poppins-Medium">
                  Email Address
                </label>
                <div className="relative flex input-card items-center">
                  <input
                    id="login_email"
                    type="email"
                    className="auth-input"
                    placeholder="Please enter the your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailFocus}
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

              <div className="flex items-center gap-1 text-sm">
                <span>Back?</span>
                <span>
                  <strong>
                    <a href="/auth/login" className="text-indigo-700">
                      login to account
                    </a>
                  </strong>
                </span>
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
