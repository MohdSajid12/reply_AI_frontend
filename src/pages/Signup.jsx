import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../config/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/signup`, form);

      if (res.data.success) {
        toast.success("Signup successful 🎉");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
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
          <h1 className="fw-bold mb-3">ReplyAI 🚀</h1>

          <h3 className="fw-light mb-3">
            Create your AI-powered workspace
          </h3>

          <p style={{ maxWidth: "450px", opacity: 0.85 }}>
            Join now and start generating smart, professional email replies instantly.
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
            <h4 className="fw-bold text-center mb-1">Create Account</h4>

            <p className="text-center text-muted small mb-4">
              Start your journey 🚀
            </p>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label small text-muted">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small text-muted">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={form.email}
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
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* Button */}
            <button
              className="btn w-100"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                color: "#fff",
                borderRadius: "10px"
              }}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-center small mt-3">
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </p>

          </div>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Signup;