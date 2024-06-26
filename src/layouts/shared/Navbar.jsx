import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logoutUser } = useAuth();
  const email = localStorage.getItem("userEmail");

  const handleLogout = async () => {
    try {
      await logoutUser();

      await axiosSecure.post("/logout");
    } catch (error) {
      console.error(error);
    }
};

  return (
    <header className=" bg-base-100 shadow-md">
      <nav className="navbar container ">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="size-11"
              src="https://i.postimg.cc/mhWx1pLN/logo.png"
              alt="logo"
            />
            <span className="text-xl font-bold text-secondary">soloSphere</span>
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <NavLink
              className="font-bold mr-5  text-lg duration-300 hover:text-secondary"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="font-bold mr-5  text-lg duration-300 hover:text-secondary"
              to="/all-jobs"
            >
              All Jobs
            </NavLink>
          </div>
          {!email ? (
            <Link
              to="/login"
              className="font-bold mr-5  text-lg duration-300 hover:text-secondary"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="unsafe-url"
                    alt="Tailwind CSS Navbar component"
                    src={user && user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3  p-2 shadow-md bg-base-100 rounded w-52 space-y-3 z-50"
              >
                <li>
                  <Link to="/add-job" className="capitalize">
                    add job
                  </Link>
                </li>
                <li>
                  <Link to="/my-posted-jobs" className="capitalize">
                    my posted jobs
                  </Link>
                </li>
                <li>
                  <Link to="/my-bids" className="capitalize">
                    my bids
                  </Link>
                </li>
                <li>
                  <Link to="/bid-request" className="capitalize">
                    bids requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-secondary py-2 px-4 rounded text-white text-center items-center justify-center hover:bg-secondary"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
