import { Helmet } from "react-helmet";
import "./../../../public/css/index.css";
import "./../../../public/css/styles.css";

export default function EditProfile() {
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
                    src="/images/default-profile.jpg"
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
                          type="text"
                          placeholder="Email address"
                        />
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
                        />
                      </div>
                    </article>
                  </section>

                  <div
                    style={{ cursor: "pointer" }}
                    className="flex"
                    id="edit-porile-button-card"
                  >
                    <button id="edit-profile-button">Save changes</button>
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
