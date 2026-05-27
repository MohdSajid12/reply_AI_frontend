import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "fw-semibold text-dark" : "text-muted";

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      {/* Logo */}
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        ReplyAI
      </span>

      {/* Center Menu */}
      <div className="mx-auto d-flex gap-4">

        <span
          className={`nav-link ${isActive("/dashboard")}`}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Generator
        </span>

        <span
          className={`nav-link ${isActive("/my-replies")}`}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/my-replies")}
        >
          My Replies
        </span>

      </div>

      {/* Logout */}
      <button
        className="btn btn-outline-danger btn-sm px-3"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;