import { useState } from "react";

export default function PostCard({
  _id,
  description,
  hasLike,
  hasSave = true,
  media,
  user,
  showComments,
  likePost,
  disLikePost,
  savePost,
  unSavePost,
  getComments,
  removePost,
  isOwn,
}) {
  // state
  const [profilePic, setProfilePic] = useState(
    user.profilePicture
      ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
      : "/images/default-profile.jpg",
  );
  const [isPostLiked, setIsPostLiked] = useState(hasLike);
  const [isPostSaved, setIsPostSaved] = useState(hasSave);
  const [isShowRemovePostButton, setIsShowRemovePostButton] = useState(false);

  return (
    <>
      <article className="profile-feed-card">
        <div>
          <header>
            <a href={`/page/${user._id}`}>
              <img
                src={profilePic}
                alt="profile picture"
                className="feed-profile-picture"
              />
            </a>
          </header>
        </div>
        <div className="w-full">
          <main>
            <h5 className="feed-username">
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <a href={`/page/${user._id}`}>
                  <strong> {user.name} </strong>
                </a>
                <div className="relative">
                  {isOwn && (
                    <button
                      className="profile-more-button"
                      onClick={() =>
                        setIsShowRemovePostButton(!isShowRemovePostButton)
                      }
                    >
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
                  )}

                  <div
                    className={`dropdown ${isShowRemovePostButton ? "visible" : ""}`}
                  >
                    <form action="">
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          removePost(_id);
                        }}
                        className="remove-button dropdown-item"
                      >
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
              <img
                className="feed-image"
                src={`${import.meta.env.VITE_BACKEND_URL}${media.path}`}
                alt="pic"
              />
            </div>
            <div className="feed-card-content">
              <div className="feed-buttons">
                <form action="" method="post">
                  <input type="hidden" name="postID" value="<%= post._id %>" />
                  {isPostLiked ? (
                    <button
                      type="submit"
                      className="max-w-max"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPostLiked(false);
                        disLikePost(e, _id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
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
                  ) : (
                    <button
                      type="submit"
                      className="max-w-max"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPostLiked(true);
                        likePost(e, _id);
                      }}
                    >
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
                  )}
                </form>

                <button
                  className="comment-icon max-w-max"
                  onClick={() => {
                    showComments(_id, user._id);
                    getComments(_id, user._id);
                  }}
                >
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

                <form action="#">
                  <input type="hidden" name="postID" value="<%= post._id %>" />

                  {isPostSaved ? (
                    <button
                      className="max-w-max"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPostSaved(false);
                        unSavePost(e, _id);
                      }}
                    >
                      <svg
                        fill="black"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="max-w-max"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPostSaved(true);
                        savePost(e, _id);
                      }}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </form>
              </div>
              <div className="text-sm my-2">
                <span> Liked by </span>
                <span></span>
                <span></span>
                <span>
                  <strong> 2,923 others </strong>
                </span>
              </div>
              <div>
                <p className="text-gray-700">{description}</p>
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
    </>
  );
}
