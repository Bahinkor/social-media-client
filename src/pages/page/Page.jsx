import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import apiClient from "./../../../configs/axios.jsx";
import "./../../../public/css/styles.css";
import "./../../../public/css/index.css";
import "./../../../public/css/profile.css";

export default function Page() {
    // params
    const {userID} = useParams();

    // useEffect
    useEffect(async () => {
        await getUserData();
    }, []);

    // func
    const getUserData = async () => {
        const res = await apiClient.get(`/page/${userID}`);
        console.log(res.data);
    };

    return (
        <>
            {/* start meta tags */}
            <Helmet>
                <title>Social Media | Page</title>
            </Helmet>
            {/* finish meta tags */}

            <div>
                <header>
                    <nav className="w-full flex-between py-5 container">
                        <div>
                            <a href="/index.html" className="logo text-xl"> Social Media </a>
                        </div>
                        <div className="relative search-box rounded-xl flex items-center">
                            <span className="absolute search-icon top-2-5 left-3">
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
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </span>
                            <input
                                placeholder="Search in Social..."
                                type="text"
                                className="bg-transparent px-8 w-full h-full"
                            />
                        </div>
                        <div className="flex gap-6 items-center">
                            <a
                                className="create-button bg-indigo-600"
                                href="/post"
                            >
                                Create
                            </a>
                            <div className="w-12 h-12 rounded-full overflow-hidden rounded-full">
                                <button
                                    id="profileButton"
                                    className="w-full h-full bg-transparent border-none"
                                >
                                    <img
                                        src="./../../../public/images/default-profile.jpg"
                                        className="object-cover"
                                        alt="profile cover"
                                    />
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                <main id="profile-container" className="container flex">
                    {/*Content*/}
                    <section id="profile-content" className="profile-content">
                        {/*Profile*/}
                        <div id="profile-details-card" className="shadow">
                            {/*Profile Header image*/}
                            <header className="profile-header">
                                <img src="/images/feed-6.jpg" className="absolute cover z-0" alt=""/>

                                {/*Profile Image*/}
                                <span className="profile-pic-card">
                            <img src="./../../../public/images/default-profile.jpg" className="profile-pic" alt=""/>
                        </span>
                            </header>
                            <main className="profile-main">
                                <div className="flex justify-between">
                                    <div>
                                        <h4 id="profile-username" className="text-xl font-Poppins-Bold">
                                            hello world
                                        </h4>

                                        <p id="profile-id">hello world</p>

                                        <p className="mt-4" id="profile-caption">
                                            Hello World!
                                        </p>

                                        <div className="flex items-center gap-1 mt-3 text">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-4 text-gray-600 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                                />
                                            </svg>

                                            <a href="https://google.com" className="url text-sm"> google.com </a>
                                        </div>
                                        <div className="flex items center gap-4 mt-4">
                                            <div className="flex items center cursor-pointer gap-1">
                                                <span className="count">6</span>
                                                <span className="text-gray-700 followers">Followers</span>
                                            </div>
                                            <div
                                                id="followings"
                                                className="flex items-center cursor-pointer gap-1"
                                            >
                                                <span className="count">7</span>
                                                <span className="text-gray-700 followings">Following</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a href="/user/edit-profile"
                                           className="min-w-max flex items-center gap-1 manage-button">
                                            <span> Manage </span>
                                        </a>

                                        <form method="post" action="">
                                            <button className="unfollow-button font-Poppins-Bold">
                                                Unfollow
                                            </button>
                                        </form>

                                        <form method="post" action="">
                                            <button className="unfollow-button font-Poppins-Bold">
                                                Follow
                                            </button>
                                        </form>

                                    </div>
                                </div>

                            </main>
                        </div>

                        <div id="profile-feeds">
                            <header id="buttons-container" className="flex items-center">
                                <button
                                    className="profile-feed__button isActive">Posts
                                </button>
                                <button className="profile-feed__button">Reels</button>
                            </header>

                            <main id="feeds-container">
                                <article className="profile-feed-card">
                                    <div>
                                        <header>
                                            <img
                                                src="./../../../public/images/default-profile.jpg"
                                                alt="profile picture"
                                                className="feed-profile-picture"
                                            />
                                        </header>
                                    </div>
                                    <div className="w-full">
                                        <main>
                                            <h5 className="feed-username">
                                    <span style={{display: "flex", justifyContent: "space-between"}}>
                                        <strong> hello world </strong>
                                        <div className="relative">
                                            <button className="profile-more-button">
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
                                                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                                    ></path>
                                                </svg>
                                            </button>

                                            <div className="dropdown">
                                                <form action="">
                                                    <button type="submit" className="remove-button dropdown-item">
                                                        <span className="text-red-500">
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
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                ></path>
                                                            </svg>
                                                        </span>
                                                        <span>Remove</span>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </span>
                                            </h5>
                                        </main>
                                        <footer>
                                            <div>
                                                <img className="feed-image" src="./../../../public/images/feed-2.jpg"
                                                     alt=""/>
                                            </div>
                                            <div className="feed-card-content">
                                                <div className="feed-buttons">
                                                    <form action="" method="post">
                                                        <input type="hidden" name="postID" value="<%= post._id %>"/>
                                                        <button type="submit" className="max-w-max">
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
                                                    </form>

                                                    <button
                                                            className="comment-icon max-w-max">
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

                                                    <form action="/post/save" method="post">
                                                        <input type="hidden" name="postID" value="<%= post._id %>"/>
                                                        <button className="max-w-max">
                                                            <svg fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth="1.5"
                                                                 stroke="currentColor"
                                                                 className="w-6 h-6"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z"
                                                                    stroke="currentColor" strokeWidth="2"
                                                                    strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                    </form>

                                                </div>
                                                <div className="text-sm my-2">
                                                    <span> Liked by </span>
                                                    <span></span>
                                                    <span> and </span>
                                                    <span>
                                                        <strong> 2,923 others </strong>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">
                                                        test desc hello world
                                                    </p>
                                                </div>
                                                <div className="mt-1">
                                                    <button className="text-xs max-w-max text-gray-500">
                                                        View all 294 comments...
                                                    </button>
                                                </div>
                                            </div>
                                        </footer>
                                    </div>
                                </article>

                                {/* if post empity */}
                                <div className="its-empty">
                                    <div className="font-Poppins-Bold text-lg text-gray-900">
                                        Aww, Nothing to show :(
                                    </div>
                                    <div>
                                        <img
                                            src="./../../../public/images/notfound.png"
                                            className="not-found-image"
                                            alt="not found"
                                        />
                                    </div>
                                </div>
                            </main>

                            {/*Footer*/}
                            <footer></footer>
                        </div>
                    </section>

                    {/*Sidebar*/}
                    <aside className="profile-sidebar">
                        <section className="profile-side-card shadow">
                            <header className="flex justify-between">
                                <h5 className="side-title" style={{fontSize: "16px"}}>People to follow</h5>
                                <div>
                                    <button>
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
                                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </header>
                            <main className="mt-6">
                                <article className="people-follow">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <img
                                                src="./../../../public/images/rad_front.jpg"
                                                className="w-15 rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-Poppins-SemiBold">Mr. Saeedi rad</p>
                                                <img src="/images/verify.png" className="w-4" alt=""/>
                                            </div>
                                            <button className="text-xs text-gray-600 max-w-max">
                                                @rad_front
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="follow-button">Follow</button>
                                    </div>
                                </article>
                                <article className="people-follow">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <img
                                                src="./../../../public/images/cristiano.png"
                                                className="w-15 h-15 rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-Poppins-SemiBold">
                                                    Cristiano ronaldo
                                                </p>
                                                <img src="./../../../public/images/verify.png" className="w-4" alt=""/>
                                            </div>
                                            <button className="text-xs text-gray-600 max-w-max">
                                                @cristiano
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="follow-button">Follow</button>
                                    </div>
                                </article>
                                <article className="people-follow">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <img
                                                src="/images/jadi.jpg"
                                                className="w-15 rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-Poppins-SemiBold">Jadi</p>
                                                <img src="/images/verify.png" className="w-4" alt=""/>
                                            </div>
                                            <button className="text-xs text-gray-600 max-w-max">
                                                @Jadi_net
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="follow-button">Follow</button>
                                    </div>
                                </article>
                            </main>
                        </section>

                        <section className="profile-side-card shadow">
                            <header className="flex justify-between">
                                <h5 className="side-title" style={{fontSize: "16px"}}>Trending now</h5>
                                <div>
                                    <button>
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
                                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </header>
                            <main className="font-Poppins-SemiBold mt-3">
                                <article className="p-3">
                                    <a href="#" className="flex items-center gap-2 text-gray-900">
                                        <span className="text-gray-600">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </span>
                                        <span> #Developer 👨‍💻 </span>
                                    </a>
                                </article>
                                <article className="p-3">
                                    <a href="#" className="flex items-center gap-2 text-gray-900">
                                        <span className="text-gray-600">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </span>
                                        <span> #sabzlearn 🌞 </span>
                                    </a>
                                </article>
                                <article className="p-3">
                                    <a href="#" className="flex items-center gap-2 text-gray-900">
                                        <span className="text-gray-600">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </span>
                                        <span> #radiogeek 🐱‍🏍 </span>
                                    </a>
                                </article>
                                <article className="p-3">
                                    <a href="#" className="flex items-center gap-2 text-gray-900">
                                        <span className="text-gray-600">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </span>
                                        <span> #master_freelance 🔥 </span>
                                    </a>
                                </article>
                                <article className="p-3">
                                    <a href="#" className="flex items-center gap-2 text-gray-900">
                                        <span className="text-gray-600">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </span>
                                        <span> #reactJs ⚛ </span>
                                    </a>
                                </article>
                            </main>
                        </section>

                        <section className="profile-side-card shadow">
                            <header className="flex justify-between">
                                <h5 className="side-title" style={{fontSize: "16px"}}>What is happening</h5>
                                <div>
                                    <button>
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
                                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </header>
                            <main id="whats-happening" className="mt-4">
                                <article className="wh-card">
                                    <img src="/images/feed-1.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-3.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-9.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-2.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-4.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-5.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-10.jpg" alt=""/>
                                </article>
                                <article className="wh-card">
                                    <img src="./../../../public/images/feed-8.jpg" alt=""/>
                                </article>
                            </main>
                        </section>
                    </aside>
                </main>

                {/*Footer*/}
                <footer className="flex items-center gap-2"></footer>

                {/*Followers Modal*/}
                <section id="modal" className="modal-screen followers-modal-screen">
                    <section id="modal-card">
                        <header
                            id="modal-header"
                            className="w-full pb-4 flex items-center justify-between"
                        >
                            <div></div>
                            <div className="pl-5">Followers (8)</div>
                            <button className="max-w-max flex-center followers-close-button">
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
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </header>
                        <main className="mt-2">
                            <article className="following-card">
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img
                                                src="./../../../public/images/default-profile.jpg"
                                                className="w-full object-cover h-full"
                                                alt="profile image"
                                            />
                                        </div>
                                        <div>
                                            <h6 className="">hello world</h6>
                                            <p className="text-sm font-Poppins-Light text-gray-600">
                                                @helloWorld
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="follow-button text-xs">Follow</button>
                                </div>
                            </article>

                            <h2 style={{textAlign: "center"}}>You can not access to followers</h2>
                        </main>
                    </section>
                </section>

                {/*Followings Modal*/}
                <section id="modal" className="modal-screen followings-modal-screen">
                    <section id="modal-card">
                        <header
                            id="modal-header"
                            className="w-full pb-4 flex items-center justify-between"
                        >
                            <div></div>
                            <div className="pl-5">Followings (7)</div>
                            <button className="max-w-max flex-center followings-close-button">
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
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </header>
                        <main className="mt-2">

                            <article className="following-card">
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">

                                            <img
                                                src="./../../../public/images/default-profile.jpg"
                                                className="w-full object-cover h-full"
                                                alt="profile image"
                                            />

                                        </div>
                                        <div>
                                            <h6 className="">hello world</h6>
                                            <p className="text-sm font-Poppins-Light text-gray-600">
                                                @helloWorld
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="follow-button text-xs">Follow</button>
                                </div>
                            </article>

                            <h2 style={{textAlign: "center"}}>No followings !!</h2>

                            <h2 style={{textAlign: "center"}}>You can not access to followings</h2>

                        </main>
                    </section>
                </section>

                {/*Modal*/}
                <div id="comments-modal" className="modal-screen comments-modal">
                    <div id="modal-card">
                        <div className="overflow-y-visible" id="comments_modal">
                            <header className="w-full border-b pb-4 flex-center text-center">
                                <p>
                                    Comments
                                </p>
                            </header>
                            <main className="mt-4">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Add a comment:
                                    </p>
                                    <form id="comment-form" method="post" action="/post/new-comment">
                                        <div className="mt-2">
                                            <textarea name="content"
                                                      className="w-full  bg-gray-100 p-5 rounded-lg font-light"
                                                      placeholder="Write something to share ...">

                                            </textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="button success text-base max-w-max px-3 py-1.5">
                                                SUBMIT
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </main>
                            <footer className="mt-5 pt-5 border-t">
                                <div>
                                    <p className="text-sm text-gray-600 my-3">
                                        Comments
                                    </p>
                                </div>

                                <div className="border bg-gray-100 p-5 my-3 rounded-md shadow-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <img
                                            src="./../../../public/images/default-profile.jpg"
                                            className="w-9 rounded-full"
                                            alt="Profile Image"
                                        />
                                        <div>
                                            <span className="text-sm text-gray-600"> Amin </span>
                                            <p className="text-xs text-gray-500">20 April 2024</p>
                                        </div>
                                    </div>
                                    <div className="ml-6 pl-4 mt-4">
                                        <q> I love this post :)) </q>
                                    </div>
                                    <div className="mt-4 flex-between">
                                        <div className="flex items-center gap-1">
                                            <button className="flex items-center gap-1">
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-4 text-gray-600 h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="pb-1">+1</span>
                                            </button>
                                        </div>
                                        <button
                                            className="max-w-max w-8 h-8 flex-center bg-gray-100 rounded-md border"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}