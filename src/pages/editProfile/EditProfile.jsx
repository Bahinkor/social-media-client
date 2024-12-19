import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert2";
import apiClient from "./../../../configs/axios.jsx";
import editProfileDataValidatorSchema from "./validatorSchema.jsx";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function EditProfile() {
  // state
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isPrivate, setIsPrivate] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get("/user/edit-profile");
        const data = res.data.user;

        setUserData(data);
        setName(data.name);
        setEmail(data.email);
        setIsPrivate(data.private === true ? "private" : "public");
        setUsername(data.username);
      } catch (err) {
        new swal({
          title: "Error",
          icon: "error",
          text: "Connection error",
          button: "ok",
        });
      }
    };

    getUserData();
  }, []);

  const sendProfileDataHandler = async () => {
    const userData = {
      name,
      email,
      username,
      private: isPrivate === "private",
    };

    const userDataAndProfilePicture = {
      name,
      email,
      username,
      private: isPrivate === "private",
      profilePicture,
    };

    try {
      await editProfileDataValidatorSchema.validate(
        profilePicture === null
          ? { ...userData }
          : { ...userDataAndProfilePicture },
        {
          abortEarly: true,
        },
      );
    } catch (err) {
      new swal({
        title: "Warning",
        icon: "warning",
        text: err.errors[0],
        button: "ok",
      });
    }

    try {
      const res = await apiClient.put(
        "/user/edit-profile",
        profilePicture === null
          ? { ...userData }
          : { ...userDataAndProfilePicture },
      );

      if (res.status === 200) {
        new swal({
          title: "Success",
          icon: "success",
          text: "Update successfully.",
          button: "ok",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      new swal({
        title: "Error",
        icon: "error",
        text: "Unknown error! Please check the submitted values.",
        button: "ok",
      });
    }
  };

  return (
    <>
      {/* meta tags */}
      <Helmet>
        <title>Social Media | Edit Profile</title>
      </Helmet>

      {/* template */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="profile-edit-wrapper">
          <div className="back-to-home">
            <a href="/">Back to home </a>
          </div>

          <section id="profile-edit-form">
            <header id="profile-edit-header">
              <button className="current-tab">Edit profile</button>
              <button>Preferences</button>
              <button>Security</button>
            </header>

            <main id="profile-edit-main">
              {/*Profile Picture*/}
              <section id="edit-profile-picture-card">
                <div
                  id="edit-profile-picture"
                  className="w-18 h-18 rounded-full overflow-hidden"
                >
                  <img
                    src={
                      userData?.profilePicture
                        ? `${import.meta.env.VITE_BACKEND_URL}${userData.profilePicture}`
                        : "/images/default-profile.jpg"
                    }
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </section>

              {/*Edit Profile Content/inputs*/}
              <form action="#">
                <section id="edit-profile-content">
                  <section id="edit-profile-container">
                    {/*Name Input*/}
                    <article className="edit-profile_input-card">
                      <label htmlFor="profile-fullName" className="text-xs">
                        Full name
                      </label>
                      <div className="profile-edit-input-card">
                        <input
                          className="profile-edit-input"
                          name="name"
                          id="profile-fullName"
                          type="text"
                          placeholder="Full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </article>

                    {/*Username Input*/}
                    <article className="edit-profile_input-card">
                      <label htmlFor="profile-username" className="text-xs">
                        Username
                      </label>
                      <div className="profile-edit-input-card">
                        <input
                          className="profile-edit-input"
                          name="username"
                          id="profile-username"
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </article>

                    {/*Email Input*/}
                    <article className="edit-profile_input-card">
                      <label htmlFor="profile-email" className="text-xs">
                        Email address
                      </label>
                      <div className="profile-edit-input-card">
                        <input
                          className="profile-edit-input"
                          name="email"
                          id="profile-email"
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </article>

                    {/*private Input*/}
                    <article className="edit-profile_input-card">
                      <label htmlFor="profile-email" className="text-xs">
                        Page type
                      </label>
                      <div className="profile-edit-input-card">
                        <select
                          className="profile-edit-input"
                          value={
                            isPrivate === "private" ? "private" : "public"
                          }
                          onChange={(e) => setIsPrivate(e.target.value)}
                        >
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </select>
                      </div>
                    </article>

                    {/*profile picture Input*/}
                    <article className="edit-profile_input-card">
                      <label className="text-xs">Profile Picture</label>
                      <div className="profile-edit-input-card">
                        <input
                          className="profile-edit-input"
                          name="profilePicture"
                          type="file"
                          onChange={(e) => setProfilePicture(e.target.files[0])}
                        />
                      </div>
                    </article>
                  </section>

                  <div
                    style={{ cursor: "pointer" }}
                    className="flex"
                    id="edit-porile-button-card"
                  >
                    <button
                      id="edit-profile-button"
                      onClick={(e) => {
                        e.preventDefault();
                        sendProfileDataHandler();
                      }}
                    >
                      Save changes
                    </button>
                  </div>
                </section>
              </form>
            </main>
          </section>
        </div>
      </div>
    </>
  );
}
