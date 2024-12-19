import { useState, useEffect } from "react";
import apiClient from "./../../../configs/axios.jsx";
import swal from "sweetalert2";
import { Helmet } from "react-helmet";
import uploadPostValidatorSchema from "./validatorSchema.jsx";
import Header from "./../../components/header/Header.jsx";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";
import "./../../../public/css/profile.css";

export default function UploadPost() {
  // state
  const [userData, setUserData] = useState(null);
  const [media, setMedia] = useState(null);
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [mainUser, setMainUser] = useState(window.localStorage.getItem("id"));

  const profilePic = userData?.profilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}${userData.profilePicture}`
    : "/images/default-profile.jpg";

  // useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get("/home");
        const data = res.data;

        if (res.status === 200) {
          setUserData(data.user);
        }
      } catch (err) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          type: "error",
          button: "ok",
        });
      }
    };

    getUserData();
  }, []);

  const sendPostHandler = async () => {
    const postData = {
      media,
      description,
      hashtags,
    };

    try {
      await uploadPostValidatorSchema.validate(
        { ...postData },
        {
          abortEarly: true,
        },
      );
    } catch (err) {
      new swal({
        title: "Warning",
        text: err.errors[0],
        type: "warning",
        button: "ok",
      });

      return false;
    }

    try {
      const res = await apiClient.post("/post", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        new swal({
          title: "Success",
          text: "Posted successfully.",
          type: "success",
          button: "ok",
        });

        const userID = window.localStorage.getItem("id");
        setTimeout(() => {
          window.location.href = `/page/${userID}`;
        }, 1000);
      } else {
        new swal({
          title: "Error",
          text: "Unknown error",
          type: "error",
          button: "ok",
        });
      }
    } catch (err) {
      new swal({
        title: "Error",
        text: "Something went wrong",
        type: "error",
        button: "ok",
      });
    }
  };

  return (
    <>
      {/* meta tags */}
      <Helmet>
        <title>Social Media | Upload Post</title>
      </Helmet>

      {/* template */}
      <div className="post-upload-body">
        <Header userID={mainUser} profilePic={profilePic} />

        {/*Main*/}
        <main id="post-upload-wrapper">
          <form method="post" encType="multipart/form-data">
            <section id="post-upload-container">
              {/*File Upload*/}
              <div className="post-upload-box">
                <h3 className="file-upload-title">File upload</h3>

                {/*Upload Input*/}
                <div id="file-upload-box" className="mt-5">
                  <span className="upload-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div className="upload-file-txt">
                    <p className="max-w-max max-h-max">Upload a file</p>
                  </div>
                  <p
                    className="font-Poppins-Bold text-3xl text-white"
                    id="browse-files"
                  >
                    Browse file
                  </p>

                  <input
                    type="file"
                    name="media"
                    id="file-upload-input"
                    accept="video/*, image/*"
                    onChange={(e) => {
                      setMedia(e.target.files[0]);
                    }}
                  />
                </div>
              </div>

              {/*Post Details*/}
              <div className="post-upload-box">
                <h3 className="file-upload-title">Post details</h3>

                <div className="mt-6 w-full"></div>
                {/*Description*/}
                <div>
                  <label htmlFor="post-description">
                    <span>Description</span>
                    <span className="requre-symbol">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="post-description"
                    placeholder="Add a description..."
                    className="w-full mt-4"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>

                {/*Hashtags*/}
                <div className="mt-4">
                  <label htmlFor="post-hashtags">
                    <span>Hashtags</span>
                    <span className="requre-symbol"></span>
                  </label>
                  <input
                    type="text"
                    name="hashtags"
                    id="post-hashtags"
                    placeholder="javascript, edit, trend, explore, ne..."
                    value={hashtags}
                    onChange={(e) => {
                      setHashtags(e.target.value);
                    }}
                  />
                  <div
                    id="hashtags-wrap"
                    className="flex text-sm my-2 items-center gap-2"
                  ></div>
                  <span className="text-sm font-Poppins-Light">
                    Split the hashtags with comma ( , )
                  </span>
                </div>

                {/*Upload Button*/}
                <div className="mt-4 flex items-center justify-end">
                  <button
                    type="submit"
                    id="upload-button"
                    className="max-w-max"
                    onClick={(e) => {
                      e.preventDefault();
                      sendPostHandler();
                    }}
                  >
                    Upload post
                  </button>
                </div>
              </div>
            </section>
          </form>
        </main>

        <section id="modal" className="modal-screen">
          <section id="modal-card"></section>
        </section>
      </div>
    </>
  );
}
