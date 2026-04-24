import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../config/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("Email and Password required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/login`, form);

      if (res.data.success) {
        localStorage.setItem("token", res.data.accessToken);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 px-0">
      <div className="row h-100 g-0">

        {/* LEFT SIDE */}
        <div
          className="col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center text-center"
          style={{
            background: "linear-gradient(135deg, #111827, #7c3aed)",
            color: "#fff",
            padding: "40px"
          }}
        >
          <h1 className="fw-bold mb-3">
            ReplyAI 🚀
          </h1>

          <h3 className="fw-light mb-3">
            Generate Smart Email Replies with AI
          </h3>

          <p style={{ maxWidth: "450px", opacity: 0.85 }}>
            Save time and write professional email responses instantly using AI-powered suggestions.
          </p>

       
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-5 d-flex justify-content-center align-items-center">

          <div
            className="p-4 shadow rounded-4"
            style={{
              width: "100%",
              maxWidth: "380px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)"
            }}
          >
            <h4 className="fw-bold text-center mb-1">Welcome Back</h4>
            <p className="text-center text-muted small mb-4">
              Login to continue
            </p>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small text-muted">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small text-muted">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button
              className="btn w-100"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                color: "#fff",
                borderRadius: "10px"
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center small mt-3">
              Don’t have an account?{" "}
              <Link to="/signup">Create account</Link>
            </p>

          </div>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;