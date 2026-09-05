import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b-2 border-asphalt bg-paper/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display font-800 text-2xl tracking-tight text-ink">PIDRS</span>
          <span className="hidden sm:inline text-xs text-ink/50">Public Works Reporting</span>
        </Link>
        <nav className="flex gap-5 items-center text-sm font-medium text-ink">
          {user ? (
            <>
              {user.role === "citizen" && (
                <>
                  <Link to="/report" className="hover:text-amber focus-ring">Report issue</Link>
                  <Link to="/my-reports" className="hover:text-amber focus-ring">My reports</Link>
                </>
              )}
              {user.role === "authority" && (
                <Link to="/dashboard" className="hover:text-amber focus-ring">Dashboard</Link>
              )}
              <span className="text-ink/50 hidden sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-asphalt text-paper px-3 py-1.5 rounded-sm hover:bg-ink/80 focus-ring"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber focus-ring">Log in</Link>
              <Link
                to="/register"
                className="bg-asphalt text-paper px-3 py-1.5 rounded-sm hover:bg-ink/80 focus-ring"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
