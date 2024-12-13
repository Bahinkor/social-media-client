import {useState, useRef, useEffect} from "react";
import {Helmet} from "react-helmet";
import apiClient from "../../../configs/axios.jsx";
import registerValidationSchema from "./validatorSchema.jsx";
import swal from "sweetalert2";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function Register() {
    // state
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ref
    const fullNameFocus = useRef(null);
    const usernameFocus = useRef(null);
    const emailFocus = useRef(null);
    const passwordFocus = useRef(null);

    // useEffect
    useEffect(() => {
        fullNameFocus.current.focus();

    }, []);

    // func
    const submitHandler = async e => {
        e.preventDefault();

        const userRegisterData = {
            name: fullName,
            username,
            email,
            password,
        };

        try {
            await registerValidationSchema.validate({...userRegisterData}, {
                abortEarly: true,
            });

        } catch (err) {
            new swal({
                title: "Warning!",
                icon: "error",
                text: err.errors[0],
                button: "ok",
            });

            return false;
        }

        try {
            const res = await apiClient.post("/auth/register", userRegisterData);

            if (res.status === 201) {
                new swal({
                    title: "Success",
                    icon: "success",
                    text: "Register successfully.",
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
                    text: "Username or email already exists.",
                    buttons: "ok",
                });
            }
        }
    };

    return (
        <>
            {/* start meta tag */}
            <Helmet>
                <title>Social Media | Register</title>
            </Helmet>
            {/* finish meta tag */}

            <div className="auth-page">
                <section id="auth-container">

                    <form id="auth-form" action="#" onSubmit={submitHandler}>
                        <header>
                            <h2 className="text-3xl">
                                Get started now 🌌
                            </h2>
                        </header>

                        <main className="mt-10">

                            <div className="auth-input-card">
                                <label htmlFor="login_name" className="font-Poppins-Medium">
                                    Full Name
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="login_name" type="text" className="auth-input"
                                           placeholder="Please enter the your full name"
                                           value={fullName}
                                           onChange={e => setFullName(e.target.value)}
                                           ref={fullNameFocus}
                                           onKeyPress={e => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault();
                                                   usernameFocus.current.focus();
                                               }
                                           }}
                                    />
                                    <span className="absolute left-2 top-4 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                        </svg>
                                    </span>
                                </div>

                            </div>

                            <div className="auth-input-card">
                                <label htmlFor="login_username" className="font-Poppins-Medium">
                                    Username
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="login_username" type="text" className="auth-input"
                                           placeholder="Please enter the your username"
                                           value={username}
                                           onChange={e => setUsername(e.target.value)}
                                           ref={usernameFocus}
                                           onKeyPress={e => {
                                               if (e.key === "Enter") {
                                                   e.preventDefault();
                                                   emailFocus.current.focus();
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
                                <label htmlFor="login_email" className="font-Poppins-Medium">
                                    Email Address
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="login_email" type="email" className="auth-input"
                                           placeholder="Please enter the your email"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                           ref={emailFocus}
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
                                                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                                        </svg>
                                    </span>
                                </div>

                            </div>

                            <div className="auth-input-card">
                                <label htmlFor="login_password" className="font-Poppins-Medium">
                                    Password
                                </label>
                                <div className="relative flex input-card items-center">
                                    <input id="login_password" type="password" className="auth-input"
                                           placeholder="Please enter the your password"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                           ref={passwordFocus}
                                    />
                                    <span className="absolute left-2 top-4 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"/>
                                        </svg>
                                    </span>
                                </div>

                            </div>

                            <div className="flex items-center gap-1 text-sm">
                                <span>
                                    Have an account?
                                </span>
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
};