import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert2";
import apiClient from "./../../../configs/axios.jsx";
import PostCard from "../../components/postCard/PostCard.jsx";
import Header from "./../../components/header/Header.jsx";
import "./../../../public/css/styles.css";
import "./../../../public/css/index.css";

export default function SearchPost() {
  // state
  const [userData, setUserData] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isOpenCommentsModal, setIsOpenCommentsModal] = useState(false);
  const [isCommentsModelLoading, setIsCommentsModelLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [postIdForSendComment, setPostIdForSendComment] = useState(null);
  const [pageIdForSendComment, setPageIdForSendComment] = useState(null);
  const [mainUser, setMainUser] = useState(window.localStorage.getItem("id"));

  const profilePic = userData?.profilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}${userData.profilePicture}`
    : "/images/default-profile.jpg";

  // useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get("/post/save");

        if (res.status === 200) {
          setUserData(res.data.user);
          setSavedPosts(res.data.posts);
        } else {
          new swal({
            title: "Warning!",
            icon: "warning",
            text: "Unknown error",
            button: "ok",
          });
        }
      } catch (err) {
        new swal({
          title: "Error",
          icon: "error",
          text: "Something went wrong!",
          button: "ok",
        });
      }
    };

    getUserData();
  }, []);

  // func
  const showCommentsModal = (postID, pageID) => {
    setIsOpenCommentsModal(true);
    setPostIdForSendComment(postID);
    setPageIdForSendComment(pageID);
  };

  const likePostHandler = async (e, postID) => {
    e.preventDefault();

    const postIDObj = {
      postID,
    };

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
    };

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
    };

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
    };

    try {
      await apiClient.delete("/post/unsave", {
        data: postIDObj,
      });

      window.location.reload();
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
        }, 1000);
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

  return (
    <>
      {/*meta tags*/}
      <Helmet>
        <title>Social Media | Bookmarks</title>
      </Helmet>

      {/* template */}
      <Header userID={mainUser} profilePic={profilePic} />

      <main className="container my-8 flex gap-10">
        {/*Sidebar*/}
        <aside id="sidebar">
          {/*Profile Card*/}
          <article className="profile-card shadow px-4">
            <div>
              <img
                src={
                  userData?.profilePicture
                    ? `${import.meta.env.VITE_BACKEND_URL}${userData?.profilePicture}`
                    : "/images/default-profile.jpg"
                }
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
                <div>Notifications</div>
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
                </div>
                <div>Messages</div>
              </a>
            </div>
            <div>
              <a className="nav-link active-tab" href="/post/save">
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
          <a href="/post">
            <button className="h-10 rounded-2xl flex-center text-white bg-indigo-700">
              Create post
            </button>
          </a>
        </aside>

        {/*Content*/}
        <section
          id="bookmarks-container"
          className="flex flex-wrap gap-4"
        ></section>

        <section id="bookmark-content">
          {savedPosts.length ? (
            savedPosts.map((post) => (
              <PostCard
                key={post._id}
                {...post}
                {...post.post}
                showComments={showCommentsModal}
                likePost={likePostHandler}
                disLikePost={disLikePostHandler}
                savePost={savePostHandler}
                unSavePost={unSavePostHandler}
                getComments={getPostCommentHandler}
                removePost={removePostHandler}
                isOwn={userData?.isOwn}
              />
            ))
          ) : (
            <h2>No Post!</h2>
          )}
        </section>
      </main>

      {/*Modal*/}
      <div
        id="comments-modal"
        className={`modal-screen comments-modal ${isOpenCommentsModal ? "visible" : ""}`}
      >
        <div id="modal-card" style={{ height: "621px", overflowY: "scroll" }}>
          <div className="overflow-y-visible" id="comments_modal">
            <header
              className="w-full border-b pb-4 flex-center text-center"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p></p>

              <p>Comments</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => setIsOpenCommentsModal(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </header>
            <main className="mt-4">
              <div>
                <p className="text-sm text-gray-700">Add a comment:</p>
                <form id="comment-form" action="#">
                  <div className="mt-2">
                    <textarea
                      name="content"
                      className="w-full  bg-gray-100 p-5 rounded-lg font-light"
                      placeholder="Write something to share..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="button success text-base max-w-max px-3 py-1.5"
                      onClick={(e) => {
                        e.preventDefault();
                        sendCommentHandler(postIdForSendComment);
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </main>
            <footer className="mt-5 pt-5 border-t">
              <div>
                <p className="text-sm text-gray-600 my-3">Comments</p>
              </div>

              {isCommentsModelLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="border bg-gray-100 p-5 my-3 rounded-md shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={
                              comment.user.profilePicture
                                ? `${import.meta.env.VITE_BACKEND_URL}${comment.user.profilePicture}`
                                : "/images/default-profile.jpg"
                            }
                            className="w-9 rounded-full"
                            alt="Profile Image"
                          />
                          <div>
                            <span className="text-sm text-gray-600">
                              {comment.user.name}
                            </span>
                            <p className="text-xs text-gray-500">
                              @{comment.user.username}
                            </p>
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
                  )}
                </>
              )}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
