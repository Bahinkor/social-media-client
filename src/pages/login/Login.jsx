import {useState, useRef, useEffect} from "react";
import apiClient from "../../../config/axios.jsx";
import swal from "sweetalert2";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function Login() {
    // state
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    // ref
    const identifierFocus = useRef(null);
    const passwordFocus = useRef(null);

    // useEffect
    useEffect(() => {
        identifierFocus.current.focus();

    }, []);

    // func
    const submitHandler = async e => {
        e.preventDefault();

        const userLoginData = {
            username: identifier,
            password,
        };

        try {
            const res = await apiClient.post("/auth/login", userLoginData);

            if (res.status === 200) {
                new swal({
                    title: "Success",
                    icon: "success",
                    text: "Login successfully.",
                    buttons: "ok",
                });
            }

        } catch (err) {
            if (err.response.status === 500) {
                new swal({
                    title: "Error",
                    icon: "error",
                    text: "Internal Server Error! Try again later.",
                    buttons: "ok",
                });
            } else {
                new swal({
                    title: "Error",
                    icon: "error",
                    text: "Username or password not match.",
                    buttons: "ok",
                });
            }
        }
    };

    return (
        <>
            <div className="auth-page">
                <section id="auth-container">

                    <form id="auth-form" action="#" onSubmit={submitHandler}>
                        <header>
                            <h2 className="text-3xl">
                                Welcome back 🌞
                            </h2>
                        </header>

                        <main className="mt-10">

                            <div className="auth-input-card">
                                <label htmlFor="register_username" className="font-Poppins-Medium">
                                    username or email
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="register_username" name="username" type="text" className="auth-input"
                                           placeholder="Please enter the your username..."
                                           value={identifier}
                                           onChange={e => setIdentifier(e.target.value)}
                                           ref={identifierFocus}
                                           onKeyPress={e => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault();
                                                   passwordFocus.current.focus();
                                               }
                                           }}
                                    />
                                    <span className="absolute left-2 top-4 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"/>
                                        </svg>

                                    </span>
                                </div>

                            </div>

                            <div className="auth-input-card">
                                <label htmlFor="register_password" className="font-Poppins-Medium">
                                    Password
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="register_password" name="password" type="password" className="auth-input"
                                           placeholder="Please enter the your password..."
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                           ref={passwordFocus}
                                    />
                                    <span className="absolute left-2 top-4 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                                        </svg>
                                    </span>
                                </div>

                            </div>

                            <div className="flex items-center gap-1 text-sm">
                                <span>
                                    Forget the password?
                                </span>
                                <span>
                                    <strong>
                                        <a href="#" className="text-indigo-700">
                                            recovery
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
};