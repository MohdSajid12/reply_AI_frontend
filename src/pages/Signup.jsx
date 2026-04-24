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

  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/signup`, form);

      if (res.data.success) {
        toast.success("OTP sent to your email 📩");
        setShowOtpModal(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/verify-email`, {
        email: form.email,
        otp,
      });

      if (res.data.success) {
        toast.success("Email verified successfully 🎉");
        setShowOtpModal(false);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(`${API}/auth/resend-otp`, {
        email: form.email,
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100 px-0" >
      <div className="row h-100 g-0">

        {/* LEFT SIDE (same as login) */}
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
              <label className="form-label small text-muted">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small text-muted">Email</label>
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
              <label className="form-label small text-muted">Password</label>
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
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>

            <p className="text-center small mt-3">
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </p>

          </div>
        </div>

      </div>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 rounded-4">

              <h5 className="mb-3 text-center">Verify Email</h5>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="btn btn-dark w-100 mb-2"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                className="btn btn-link w-100"
                onClick={resendOtp}
              >
                Resend OTP
              </button>

            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Signup;