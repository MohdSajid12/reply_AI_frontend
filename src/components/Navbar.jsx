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

      {/* Right Side */}
      <div className="d-flex align-items-center gap-3">

        {/* Avatar */}
        <div
          title="User"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#111827",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          S
        </div>

        {/* Logout */}
        <button
          className="btn btn-outline-danger btn-sm px-3"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;