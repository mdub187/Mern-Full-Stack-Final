
import { Link } from "react-router-dom";
import { useAuth } from "../utils/Auth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">My App</Link>
      </h1>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/signup" className="mr-4 text-white hover:underline">
              Sign Up
            </Link>
            <Link to="/" className="text-white hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" className="mr-4 text-white hover:underline">
              Home
            </Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;