import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert2";
import apiClient from "./../../../configs/axios.jsx";
import Header from "./../../components/header/Header.jsx";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function Home() {
  // state
  const [userData, setUserData] = useState(null);
  const [mainUser, setMainUser] = useState(window.localStorage.getItem("id"));
  const [followRequests, setFollowRequests] = useState([]);

  const profilePic = userData?.profilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}${userData.profilePicture}`
    : "/images/default-profile.jpg";

  // useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get("/home");
        const data = res.data;

        setUserData(data.user);
      } catch (err) {
        new swal({
          title: "Error!",
          icon: "error",
          text: "Something went wrong",
          button: "ok",
        });
      }

      try {
        const res = await apiClient.get("/page/request/get");
        setFollowRequests(res.data);
      } catch (err) {
        new swal({
          title: "Error!",
          icon: "error",
          text: "Something went wrong",
          button: "ok",
        });
      }
    };

    getUserData();
  }, []);

  // func
  const logoutHandler = () => {
    localStorage.removeItem("id");
    window.location.href = "/auth/login";
  };

  return (
    <>
      {/* meta tags */}
      <Helmet>
        <title>Social Media | Home</title>
      </Helmet>

      {/* template */}
      <Header userID={mainUser} profilePic={profilePic} />

      {/*Main*/}
      <main className="flex gap-4 container my-8">
        {/*Sidebar*/}
        <aside id="sidebar">
          {/*Profile Card*/}
          <article className="profile-card shadow px-4">
            <div>
              <img
                src={profilePic}
                className="w-12 h-12 rounded-full"
                alt="profile picture"
              />
            </div>
            <div>
              <p className="user-profile-name text-gray-900 font-Poppins-Bold text-sm">
                {userData?.name}
              </p>
              <p className="font-Poppins-Light text-xs text-gray-500">
                @{userData?.username}
              </p>
            </div>
          </article>

          {/*Website Main Links*/}
          <section className="my-4 shadow overflow-hidden" id="sidebar-links">
            <div>
              <a className="nav-link active-tab" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div>Home</div>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <div>Explore</div>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
                <div onClick={logoutHandler}>Log out</div>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/">
                <div className="relative flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <div className="absolute messages-count">2</div>
                </div>
                <div>Messages</div>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/post/save">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </div>
                <div>Bookmarks</div>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                    />
                  </svg>
                </div>
                <div>Analytics</div>
              </a>
            </div>
            <div>
              <a id="themeButton" className="nav-link" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                    />
                  </svg>
                </div>
                <p>Theme</p>
              </a>
            </div>
            <div>
              <a className="nav-link" href="/">
                <div className="flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div>Settings</div>
              </a>
            </div>
          </section>

          {/*Create a post*/}
          <a
            href="/post"
            className="h-10 post-create rounded-2xl flex-center text-white bg-indigo-700"
          >
            Create post
          </a>
        </aside>

        {/*Content / Feeds / Posts*/}
        <section id="content">
          {/*Stories*/}
          <div id="stories" className="gap-4">
            <article className="story-card">
              {/*background*/}
              <span className="story-image-card">
                <img
                  src="/images/story-1.jpg"
                  alt="story image"
                  className="story-image"
                />
              </span>
              {/*Profile cover*/}
              <div className="story-content">
                <div>
                  <img
                    src="/images/profile-13.jpg"
                    className="story-profile"
                    alt=""
                  />
                </div>

                <div className="story-username">Elisabet Johnson</div>
              </div>
              <div className="gradient-bg"></div>
            </article>
            <article className="story-card">
              {/*background*/}
              <span className="story-image-card">
                <img
                  src="/images/story-2.jpg"
                  alt="story image"
                  className="story-image"
                />
              </span>
              <div className="story-content">
                {/*Profile cover*/}
                <div>
                  <img
                    src="/images/profile-2.jpg"
                    className="story-profile"
                    alt=""
                  />
                </div>

                <div className="story-username">Elisabet Johnson</div>
              </div>
              <div className="gradient-bg"></div>
            </article>

            <article className="story-card">
              {/*background*/}
              <span className="story-image-card">
                <img
                  src="/images/story-3.jpg"
                  alt="story image"
                  className="story-image"
                />
              </span>
              <div className="story-content">
                <div>
                  <img
                    src="/images/profile-3.jpg"
                    className="story-profile"
                    alt=""
                  />
                </div>
                <div className="story-username">Elisabet Johnson</div>
              </div>
              <div className="gradient-bg"></div>
            </article>

            <article className="story-card">
              {/*background*/}
              <span className="story-image-card">
                <img
                  src="/images/story-4.jpg"
                  alt="story image"
                  className="story-image"
                />
              </span>
              <div className="story-content">
                {/*Profile cover*/}
                <div>
                  <img
                    src="/images/profile-4.jpg"
                    className="story-profile"
                    alt=""
                  />
                </div>

                <div className="story-username">Elisabet Johnson</div>
              </div>
              <div className="gradient-bg"></div>
            </article>

            <article className="story-card">
              {/*background*/}
              <span className="story-image-card">
                <img
                  src="/images/story-5.jpg"
                  alt="story image"
                  className="story-image"
                />
              </span>
              <div className="story-content">
                {/*Profile cover*/}
                <div>
                  <img
                    src="/images/profile-5.jpg"
                    className="story-profile"
                    alt=""
                  />
                </div>

                <div className="story-username">Elisabet Johnson</div>
              </div>
              <div className="gradient-bg"></div>
            </article>
          </div>

          {/*Feeds / Posts*/}
          <section id="feeds">
            {/*Feed Card*/}
            <article className="feed-card shadow">
              {/*Feed header*/}
              <header>
                <a href="/" className="flex items-center gap-3">
                  <div>
                    <img
                      src="/images/profile-1.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium text-sm twitter-name">
                      Lena Mc'Queen
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>

              {/*Feed body*/}
              <main className="tweet-body">
                <img
                  src="/images/feed-1.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>

              {/*Feed footer*/}
              <footer className="px-4">
                {/*Like & Comment Share / Views & Save Button*/}
                <section className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button title="like" className="max-w-max">
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                    <button title="comment" className="max-w-max">
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
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                    </button>
                    <button title="comment" className="max-w-max">
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
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/*Views, Save*/}
                  <div className="flex items-center gap-2 justify-between">
                    {/*Views*/}
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </span>
                      <span className="text-xs"> 29,428 </span>
                    </div>

                    {/*save button*/}
                    <div className="max-h-max">
                      <button className="save-button">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span> save </span>
                      </button>
                    </div>
                  </div>
                </section>

                {/*Likes count*/}
                <div className="mt-1 flex items-center relative">
                  <div className="liked-by-wrapper relative block">
                    <span>
                      <img
                        src="/images/profile-5.jpg"
                        className="likedBy"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="/images/profile-6.jpg"
                        className="likedBy left-3 z-10"
                        alt=""
                      />
                    </span>
                    <span> </span>
                    <img
                      src="/images/profile-7.jpg"
                      className="likedBy left-6 z-20"
                      alt=""
                    />
                  </div>

                  <div className="text-sm">
                    <span> Liked by </span>
                    <span></span>
                    <span> and </span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>

                {/*User Infos (name, description)*/}
                <div className="mt-1 text-sm gap-1">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>

                {/*View all comments*/}
                <div>
                  <button className="text-xs max-w-max text-gray-500">
                    View all 294 comments...
                  </button>
                </div>
              </footer>
            </article>

            {/*Feed Card*/}
            <article className="feed-card shadow">
              <header>
                <a href="/" className="flex items-center gap-3">
                  <div>
                    <img
                      src="/images/profile-2.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium text-sm twitter-name">
                      Davood amiri
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>
              <main className="tweet-body">
                <img
                  src="/images/feed-2.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>
              <footer className="px-4">
                <div className="flex items-center gap-2">
                  <button title="like" className="max-w-max">
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
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
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
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
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-1 flex items-center relative">
                  <div className="liked-by-wrapper relative block">
                    <span>
                      <img
                        src="/images/profile-5.jpg"
                        className="likedBy"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="/images/profile-6.jpg"
                        className="likedBy left-3 z-10"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="/images/profile-7.jpg"
                        className="likedBy left-6 z-20"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="text-sm">
                    <span> Liked by </span>
                    <span>
                      <strong></strong>
                    </span>
                    <span> and </span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>
                <div className="mt-1 text-sm gap-1">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <button className="text-xs max-w-max text-gray-500">
                    View all 294 comments ..
                  </button>
                </div>
              </footer>
            </article>

            {/*Feed Card*/}
            <article className="feed-card shadow">
              <header>
                <a href="/" className="flex items-center gap-3">
                  <div>
                    <img
                      src="/images/profile-3.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium text-sm twitter-name">
                      Hosna Kazemi
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>
              <main className="tweet-body">
                <img
                  src="/images/feed-3.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>
              <footer className="px-4">
                <div className="flex items-center gap-2">
                  <button title="like" className="max-w-max">
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
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
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
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
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-1 flex items-center relative">
                  <div className="liked-by-wrapper relative block">
                    <span>
                      <img
                        src="/images/profile-5.jpg"
                        className="likedBy"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="/images/profile-6.jpg"
                        className="likedBy left-3 z-10"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="/images/profile-7.jpg"
                        className="likedBy left-6 z-20"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="text-sm">
                    <span> Liked by </span>
                    <span></span>
                    <span></span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>
                <div className="mt-1 text-sm gap-1">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <button className="text-xs max-w-max text-gray-500">
                    View all 294 comments ..
                  </button>
                </div>
              </footer>
            </article>
          </section>
        </section>

        {/*(Right Sidebar) Messages, Requests*/}
        <aside id="right-sidebar">
          {/*Requests*/}
          <section id="requests">
            <h4>Requests</h4>
            <section>
              <article className="request-card">
                <div className="flex mb-3 items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/images/profile-1.jpg"
                      className="object-cover w-full h-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-sm font-Poppins-SemiBold">
                      Jeniffer Lowernce
                    </p>
                    <p className="text-xs text-gray-500">2 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>

              <article className="request-card">
                <div className="flex mb-3 items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/images/profile-4.jpg"
                      className="object-cover w-full h-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-sm font-Poppins-SemiBold">
                      Elena Rashidi
                    </p>
                    <p className="text-xs text-gray-500">6 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>

              <article className="request-card">
                <div className="flex mb-3 items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/images/profile-14.jpg"
                      className="object-cover w-full h-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-sm font-Poppins-SemiBold">shabnam.494</p>
                    <p className="text-xs text-gray-500">14 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>
            </section>
          </section>

          {/*Popular Posts*/}
          <section
            id="popular-posts"
            className="w-full mt-10 p-4 bg-white rounded-lg shadow"
          >
            <header>
              <div className="flex justify-between">
                <p>
                  <strong> Popular posts </strong>
                </p>
              </div>
            </header>
            <main className="mt-4">
              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-10.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-9.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-4.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-2.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>
            </main>
          </section>

          {/*Popular users*/}
          <section
            id="popular-users"
            className="w-full mt-10 p-4 bg-white rounded-lg shadow"
          >
            <header>
              <div className="flex justify-between gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-gold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p>
                    <strong> Popular users </strong>
                  </p>
                </div>
              </div>
            </header>
            <main className="mt-4">
              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-10.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-9.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-4.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-2.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs mb-1 text-gray-900 line-clamp-2">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-gray-600 text-xs">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>
            </main>
          </section>
        </aside>
      </main>

      {/*Modals*/}
      <section className="fixed"></section>

      {/*Application  Footer*/}
      <footer id="footer" className="flex-center py-2 shadow"></footer>
    </>
  );
}
