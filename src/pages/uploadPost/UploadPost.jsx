import { useState, useEffect } from "react";
import apiClient from "./../../../configs/axios.jsx";
import swal from "sweetalert2";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";
import "./../../../public/css/profile.css";

export default function UploadPost() {
  // state
  const [userData, setUserData] = useState(null);

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

  return (
    <>
      <div className="post-upload-body">
        <header>
          <nav className="w-full flex-between  py-5 container">
            <div>
              <a className="logo text-xl" href="/">
                Social Media
              </a>
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
              <a className="create-button bg-indigo-600" href="/post">
                Create
              </a>
              <div className="w-12 h-12 rounded-full overflow-hidden rounded-full">
                <a
                  href={`/page/${userData?._id}`}
                  id="profileButton"
                  className="w-full h-full bg-transparent border-none"
                >
                  <img
                    src={
                      userData?.profilePicture
                        ? `${import.meta.env.VITE_BACKEND_URL}${userData.profilePicture}`
                        : "/images/default-profile.jpg"
                    }
                    className="object-cover"
                    alt="profile cover"
                  />
                </a>
              </div>
            </div>
          </nav>
        </header>

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
                  ></textarea>
                </div>

                {/*Hashtags*/}
                <div className="mt-4">
                  <label htmlFor="post-hashtags">
                    <span>Hashtags</span>
                    <span className="requre-symbol">*</span>
                  </label>
                  <input
                    type="text"
                    name="hashtags"
                    id="post-hashtags"
                    placeholder="javascript, edit, trend, explore, ne..."
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
