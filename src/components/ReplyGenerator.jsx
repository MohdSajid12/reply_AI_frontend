import { useState } from "react";
import axios from "axios";
import API from "../config/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function ReplyGenerator() {
  const [emailText, setEmailText] = useState("");
  const [tone, setTone] = useState("formal");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  const generateReply = async () => {
    if (!emailText.trim()) {
      return toast.error("Please enter email content");
    }

    try {
      setLoading(true);
      setReply("");

      const res = await axios.post(`${API}/api/reply/generate-reply`, {
        emailText,
        tone,
      });

      if (res.data.success) {
        setReply(res.data.reply);
        toast.success("Reply generated");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const saveReply = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/api/reply/save`,
        { emailText, tone, replyText: reply },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Saved successfully 🎉");
      navigate("/my-replies");
    } catch {
      toast.error("Save failed");
    }
  };

  const copyReply = () => {
    navigator.clipboard.writeText(reply);
    toast.success("Copied 📋");
  };

  return (
    <>
      <Navbar />

      <div
        className="container-fluid py-4 px-4"
        style={{
          background: "linear-gradient(135deg, #f3f4f6, #eef2ff)",
          minHeight: "100vh",
        }}
      >
        <h4 className="fw-bold mb-4">📧 Email Reply Generator</h4>

        <div className="row g-4">

          {/* LEFT */}
          <div className="col-md-6">
            <div
              className="p-4 rounded-4 shadow"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)"
              }}
            >
              <h6 className="fw-semibold mb-3">Email Input</h6>

              <textarea
                className="form-control mb-3"
                rows="10"
                placeholder="Paste email here..."
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />

              <div className="d-flex justify-content-between align-items-center">

                <select
                  className="form-select w-auto"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                </select>

                {/* BUTTON */}
                <button
                  className={`btn px-4 d-flex align-items-center gap-2 ${
                    reply ? "btn-outline-dark" : "btn-dark"
                  }`}
                  onClick={generateReply}
                  disabled={loading}
                  style={{ borderRadius: "10px" }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Generating...
                    </>
                  ) : reply ? (
                    <>🔄 Regenerate</>
                  ) : (
                    <> Generate</>
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6">
            <div
              className="p-4 rounded-4 shadow"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)"
              }}
            >
              <h6 className="fw-semibold mb-3">Generated Reply</h6>

              <textarea
                className="form-control mb-3"
                rows="10"
                placeholder="Your reply will appear here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              {reply && (
                <div className="d-flex justify-content-between">

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={copyReply}
                  >
                    Copy
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={saveReply}
                  >
                    Save
                  </button>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default ReplyGenerator;