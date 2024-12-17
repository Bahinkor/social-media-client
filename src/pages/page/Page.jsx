import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import swal from "sweetalert2";
import {Helmet} from "react-helmet";
import apiClient from "./../../../configs/axios.jsx";
import PostCard from "./../../components/PostCard.jsx";
import "./../../../public/css/styles.css";
import "./../../../public/css/index.css";
import "./../../../public/css/profile.css";

export default function Page() {
    // state
    const [userData, setUserData] = useState(null);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);
    const [isOpenFollowersModal, setIsOpenFollowersModal] = useState(false);
    const [isOpenFollowingsModal, setIsOpenFollowingsModal] = useState(false);
    const [isOpenCommentsModal, setIsOpenCommentsModal] = useState(false);
    const [mainUserFollowings, setMainUserFollowings] = useState([]);
    const [mainUser, setMainUser] = useState(window.localStorage.getItem("id"));
    const [isCommentsModelLoading, setIsCommentsModelLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [commentParentID, setCommentParentID] = useState("");
    const [postIdForSendComment, setPostIdForSendComment] = useState(null);
    const [pageIdForSendComment, setPageIdForSendComment] = useState(null);

    // params
    const {userID} = useParams();

    // useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get(`/page/${userID}`);

                if (!res.data.hasAccess) {
                    new swal({
                        title: "Warning!",
                        icon: "warning",
                        text: "You do not have access to this page.",
                        button: "ok",
                    });
                }

                setUserData(res.data);

            } catch (err) {
                new swal({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error",
                    button: "ok",
                });

                window.location.href = "/";
            }

            try {
                const res = await apiClient.get(`/page/${userID}/followers`);
                setUserFollowers(res.data.followers);

            } catch (err) {
                setUserFollowers(false);
            }

            try {
                const res = await apiClient.get(`/page/${userID}/followings`);
                setUserFollowings(res.data.followings);

            } catch (err) {
                setUserFollowings(false);
            }

            try {
                const res = await apiClient.get(`/page/${mainUser}/followings`);
                setMainUserFollowings(res.data.followings);

            } catch (err) {
                new swal({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error",
                    button: "ok",
                });
            }
        };

        fetchData();

    }, [userID]);

    const profilePic = userData?.page.profilePicture ? `${import.meta.env.VITE_BACKEND_URL}${userData.page.profilePicture}` : "/images/default-profile.jpg";

    const showCommentsModal = (postID, pageID) => {
        setIsOpenCommentsModal(true);
        setPostIdForSendComment(postID);
        setPageIdForSendComment(pageID);
    };

    const followUserHandler = async (e, targetUserID) => {
        e.preventDefault();

        try {
            await apiClient.post(`/page/${targetUserID || userID}/follow`);

        } catch (err) {
            new swal({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                button: "ok",
            });
        }

        window.location.reload();
    };

    const unFollowUserHandler = async (e, targetUserID) => {
        e.preventDefault();

        try {
            await apiClient.delete(`/page/${targetUserID || userID}/unfollow`);

        } catch (err) {
            new swal({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                button: "ok",
            });
        }

        window.location.reload();
    };

    const likePostHandler = async (e, postID) => {
        e.preventDefault();

        const postIDObj = {
            postID,
        }

        try {
            await apiClient.post("/post/like", postIDObj);

        } catch (err) {
            return err;
        }
    };

    const disLikePostHandler = async (e, postID) => {
        e.preventDefault();

        const postIDObj = {
            postID,
        }


        try {
            await apiClient.delete("/post/dislike", {
                data: postIDObj,
            });

        } catch (err) {
            return err;
        }
    };

    const savePostHandler = async (e, postID) => {
        e.preventDefault();

        const postIDObj = {
            postID,
        }

        try {
            await apiClient.post("/post/save", postIDObj);

        } catch (err) {
            return err;
        }
    };

    const unSavePostHandler = async (e, postID) => {
        e.preventDefault();

        const postIDObj = {
            postID,
        }

        try {
            await apiClient.delete("/post/unsave", {
                data: postIDObj,
            });

        } catch (err) {
            return err;
        }
    };

    const getPostCommentHandler = async (postID, pageID) => {
        try {
            const res = await apiClient.get(`/post/${postID}/comments?p=${pageID}`);
            const data = res.data;

            setComments(data);
            setIsCommentsModelLoading(false);

        } catch (err) {
            return err;
        }
    };

    const sendCommentHandler = async (postID) => {
        try {
            const res = await apiClient.post("/post/new-comment", {
                postID,
                content: commentContent,
            });

            if (res.status === 201) {
                new swal({
                    title: "Success",
                    text: "Send comment successfully.",
                    icon: "success",
                    button: "ok",
                });

                setCommentContent("");
                await getPostCommentHandler(postID, pageIdForSendComment);

            } else {
                new swal({
                    title: "Error!",
                    text: "Unknown error!",
                    icon: "error",
                    button: "ok",
                });
            }

        } catch (err) {
            new swal({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                button: "ok",
            });
        }
    };

    const removePostHandler = async (postID) => {
        try {
            const res = await apiClient.delete(`/post/${postID}/remove`);

            if (res.status === 200) {
                new swal({
                    title: "Success",
                    text: "Remove post successfully.",
                    icon: "success",
                    button: "ok",
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }

        } catch (err) {
            new swal({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                button: "ok",
            });
        }
    };

    return (
        <>
            {/* start meta tags */}
            <Helmet>
                <title>Social Media | {userData?.page.name || "Page"}</title>
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
                                        src={profilePic}
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
                            <img src={profilePic} className="profile-pic" alt="profile image"/>
                        </span>
                            </header>
                            <main className="profile-main">
                                <div className="flex justify-between">
                                    <div>
                                        <h4 id="profile-username" className="text-xl font-Poppins-Bold">
                                            {userData?.page.name}
                                        </h4>

                                        <p id="profile-id">{userData?.page.username}</p>

                                        <p className="mt-4" id="profile-caption">
                                            @{userData?.page.username}
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
                                            <div className="flex items center cursor-pointer gap-1"
                                                 onClick={() => setIsOpenFollowersModal(true)}>
                                                <span className="count">{userFollowers.length}</span>
                                                <span className="text-gray-700 followers">Followers</span>
                                            </div>
                                            <div
                                                id="followings"
                                                className="flex items-center cursor-pointer gap-1"
                                                onClick={() => setIsOpenFollowingsModal(true)}
                                            >
                                                <span className="count">{userFollowings.length}</span>
                                                <span className="text-gray-700 followings">Followings</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {
                                            userData?.isOwn && (
                                                <a href="/user/edit-profile"
                                                   className="min-w-max flex items-center gap-1 manage-button">
                                                    <span> Manage </span>
                                                </a>
                                            )
                                        }

                                        {
                                            userData?.followed && !userData?.isOwn && (
                                                <form method="post" action="#">
                                                    <button className="unfollow-button font-Poppins-Bold"
                                                            onClick={unFollowUserHandler}>
                                                        Unfollow
                                                    </button>
                                                </form>
                                            )
                                        }

                                        {
                                            !userData?.followed && !userData?.isOwn && (
                                                <form method="post" action="#">
                                                    <button className="unfollow-button font-Poppins-Bold"
                                                            onClick={followUserHandler}>
                                                        Follow
                                                    </button>
                                                </form>
                                            )
                                        }

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
                                {
                                    userData?.posts ? (
                                        userData?.posts.map(post => {
                                            return (
                                                <PostCard
                                                    key={post.user._id}
                                                    {...post}
                                                    showComments={showCommentsModal}
                                                    likePost={likePostHandler}
                                                    disLikePost={disLikePostHandler}
                                                    savePost={savePostHandler}
                                                    unSavePost={unSavePostHandler}
                                                    getComments={getPostCommentHandler}
                                                    removePost={removePostHandler}
                                                />
                                            )
                                        })
                                    ) : (
                                        <div className="its-empty">
                                            <div className="font-Poppins-Bold text-lg text-gray-900">
                                                Aww, Nothing to show :(
                                            </div>
                                            <div>
                                                <img
                                                    src="./../../../public/images/notfound.png"
                                                    className="not-found-image"
                                                    alt="no post"
                                                />
                                            </div>
                                        </div>
                                    )
                                }
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
                                                src="/images/jadi.jpg"
                                                className="w-15 rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-Poppins-SemiBold">Reza Bahinkor</p>
                                                <img src="/images/verify.png" className="w-4" alt=""/>
                                            </div>
                                            <button className="text-xs text-gray-600 max-w-max">
                                                @bahinkor
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
                                                src="/images/cristiano.png"
                                                className="w-15 h-15 rounded-full"
                                                alt=""
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-Poppins-SemiBold">
                                                    Cristiano ronaldo
                                                </p>
                                                <img src="/images/verify.png" className="w-4" alt=""/>
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
                                        <span> #programmer 🌞 </span>
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
                                        <span> #radiogeek ‍🏍 </span>
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
                                        <span> #ai 🔥 </span>
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
                                    <img src="/images/feed-3.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-9.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-2.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-4.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-5.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-10.jpg" alt="image"/>
                                </article>
                                <article className="wh-card">
                                    <img src="/images/feed-8.jpg" alt="image"/>
                                </article>
                            </main>
                        </section>
                    </aside>
                </main>

                {/*Footer*/}
                <footer className="flex items-center gap-2"></footer>

                {/*Followers Modal*/}
                <section id="modal"
                         className={`modal-screen followers-modal-screen ${isOpenFollowersModal ? "visible" : ""}`}>
                    <section id="modal-card">
                        <header
                            id="modal-header"
                            className="w-full pb-4 flex items-center justify-between"
                        >
                            <div></div>
                            <div className="pl-5">Followers ({userFollowers.length})</div>
                            <button className="max-w-max flex-center followers-close-button"
                                    onClick={() => setIsOpenFollowersModal(false)}>
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

                            {
                                userFollowers === false ? (
                                    <h2 style={{textAlign: "center"}}>You can not access to followers</h2>
                                ) : (
                                    userFollowers.map(follower => (
                                        <article key={follower._id} className="following-card">
                                            <div className="flex items-center gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                                        <img
                                                            src={follower.profilePicture ? `${import.meta.env.VITE_BACKEND_URL}${follower.profilePicture}` : "/images/default-profile.jpg"}
                                                            className="w-full object-cover h-full"
                                                            alt="profile image"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="">{follower.name}</h6>
                                                        <p className="text-sm font-Poppins-Light text-gray-600">
                                                            @{follower.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                {
                                                    mainUserFollowings.some(user => user._id === follower._id) ? (
                                                        <button className="follow-button text-xs"
                                                                onClick={e => unFollowUserHandler(e, follower._id)}>Unfollow</button>
                                                    ) : mainUser === follower._id ? (
                                                        <button className="" type="hidden"></button>
                                                    ) : (
                                                        <button className="follow-button text-xs"
                                                                onClick={e => followUserHandler(e, follower._id)}>Follow</button>
                                                    )
                                                }
                                            </div>

                                        </article>
                                    ))
                                )
                            }

                        </main>
                    </section>
                </section>

                {/*Followings Modal*/}
                <section id="modal"
                         className={`modal-screen followings-modal-screen ${isOpenFollowingsModal ? "visible" : ""}`}>
                    <section id="modal-card">
                        <header
                            id="modal-header"
                            className="w-full pb-4 flex items-center justify-between"
                        >
                            <div></div>
                            <div className="pl-5">Followings ({userFollowings.length})</div>
                            <button className="max-w-max flex-center followings-close-button"
                                    onClick={() => setIsOpenFollowingsModal(false)}>
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

                            {
                                userFollowings === false ? (
                                    <h2 style={{textAlign: "center"}}>You can not access to followings</h2>
                                ) : (
                                    userFollowings.map(following => (
                                        <article key={following._id} className="following-card">
                                            <div className="flex items-center gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                                        <img
                                                            src={following.profilePicture ? `${import.meta.env.VITE_BACKEND_URL}${following.profilePicture}` : "/images/default-profile.jpg"}
                                                            className="w-full object-cover h-full"
                                                            alt="profile image"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="">{following.name}</h6>
                                                        <p className="text-sm font-Poppins-Light text-gray-600">
                                                            @{following.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                {
                                                    mainUserFollowings.some(user => user._id === following._id) ? (
                                                        <button className="follow-button text-xs"
                                                                onClick={e => unFollowUserHandler(e, following._id)}>Unfollow</button>
                                                    ) : mainUser === following._id ? (
                                                        <button className="" type="hidden"></button>
                                                    ) : (
                                                        <button className="follow-button text-xs"
                                                                onClick={e => followUserHandler(e, following._id)}>Follow</button>
                                                    )
                                                }

                                            </div>
                                        </article>
                                    ))
                                )
                            }

                        </main>
                    </section>
                </section>

                {/*Modal*/}
                <div id="comments-modal"
                     className={`modal-screen comments-modal ${isOpenCommentsModal ? "visible" : ""}`}>
                    <div id="modal-card" style={{height: "621px", overflowY: "scroll"}}>
                        <div className="overflow-y-visible" id="comments_modal">
                            <header className="w-full border-b pb-4 flex-center text-center"
                                    style={{display: "flex", justifyContent: "space-between"}}>
                                <p></p>

                                <p>
                                    Comments
                                </p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    onClick={() => setIsOpenCommentsModal(false)}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </header>
                            <main className="mt-4">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Add a comment:
                                    </p>
                                    <form id="comment-form" action="#">
                                        <div className="mt-2">
                                            <textarea
                                                name="content"
                                                className="w-full  bg-gray-100 p-5 rounded-lg font-light"
                                                placeholder="Write something to share..."
                                                value={commentContent}
                                                onChange={e => setCommentContent(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="button success text-base max-w-max px-3 py-1.5" onClick={e => {
                                                e.preventDefault();
                                                sendCommentHandler(postIdForSendComment);
                                            }}>
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

                                {
                                    isCommentsModelLoading ? (
                                        <h2>Loading...</h2>
                                    ) : (
                                        <>
                                            {
                                                comments.length > 0 ? (
                                                    comments.map(comment => (
                                                        <div key={comment._id}
                                                             className="border bg-gray-100 p-5 my-3 rounded-md shadow-sm">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <img
                                                                    src={comment.user.profilePicture ? `${import.meta.env.VITE_BACKEND_URL}${comment.user.profilePicture}` : "/images/default-profile.jpg"}
                                                                    className="w-9 rounded-full"
                                                                    alt="Profile Image"
                                                                />
                                                                <div>
                                                                    <span
                                                                        className="text-sm text-gray-600">{comment.user.name}</span>
                                                                    <p className="text-xs text-gray-500">@{comment.user.username}</p>
                                                                </div>
                                                            </div>
                                                            <div className="ml-6 pl-4 mt-4">
                                                                <q>{comment.content}</q>
                                                            </div>
                                                            <div className="mt-4 flex-between">
                                                                <div className="flex items-center gap-1">
                                                                    <button className="flex items-center gap-1">
                                                                        <span></span>
                                                                        <span className="pb-1"></span>
                                                                    </button>
                                                                </div>
                                                                <button></button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <h2>No Comment</h2>
                                                )
                                            }
                                        </>
                                    )
                                }

                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}