export default function Header({ userID, profilePic }) {
  return (
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
              href={`/page/${userID}`}
              id="profileButton"
              className="w-full h-full bg-transparent border-none"
            >
              <img
                src={profilePic}
                className="object-cover"
                alt="profile cover"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
