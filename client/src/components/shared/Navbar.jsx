import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../../redux/api/api";
import { userNotExist } from "../../redux/reducers/auth";
import { FaHome, FaMapMarkedAlt, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      dispatch(userNotExist());
      navigate("/");
    } catch (err) {
      toast.error("Logout failed, please try again" + err.message);
    }
  };

  const activeClass = "text-white font-semibold border-b-2 border-white";

  return (
    <nav className="w-full bg-blue-600 px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-lg">ChargeConnect</div>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 text-white hover:text-gray-200 ${
                isActive ? activeClass : ""
              }`
            }
          >
            <FaHome className="text-lg" />
            <span className="hidden md:inline">Home</span>
          </NavLink>

          <NavLink
            to="/add-station"
            className={({ isActive }) =>
              `flex items-center gap-1 text-white hover:text-gray-200 ${
                isActive ? activeClass : ""
              }`
            }
          >
            <FaPlus className="text-lg" />
            <span className="hidden md:inline">Add</span>
          </NavLink>

          <NavLink
            to="/view-map"
            className={({ isActive }) =>
              `flex items-center gap-1 text-white hover:text-gray-200 ${
                isActive ? activeClass : ""
              }`
            }
          >
            <FaMapMarkedAlt className="text-lg" />
            <span className="hidden md:inline">Map</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-4 text-white text-sm">
          <span className="hidden sm:block text-yellow-400 font-medium">
            {user?.username ? `Welcome, ${user.username}` : `Welcome, Guest`}
          </span>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded flex items-center gap-1"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">
                {isLoading ? "Logging out..." : "Logout"}
              </span>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-1 hover:text-gray-200"
            >
              <FaSignInAlt />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
