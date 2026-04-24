import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function MyReplies() {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchReplies = async () => {
    try {
      const res = await axios.get(`${API}/api/reply/replies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setReplies(res.data.replies);
      }
    } catch {
      toast.error("Failed to load replies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/reply/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReplies(replies.filter((item) => item._id !== id));
      setDeleteId(null);
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditId(item._id);
    setEditText(item.replyText);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/api/reply/update/${editId}`,
        { replyText: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = replies.map((item) =>
        item._id === editId ? res.data.reply : item
      );

      setReplies(updated);
      setEditId(null);
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
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
        <h4 className="fw-bold mb-4">📜 My Saved Replies</h4>

        {loading ? (
          <p>Loading...</p>
        ) : replies.length === 0 ? (
          <p className="text-muted">No replies found</p>
        ) : (
          <div className="row g-4">
            {replies.map((item) => (
              <div key={item._id} className="col-md-6">

                <div
                  className="p-4 rounded-4 shadow"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <small className="text-muted mb-2 d-block">
                    Tone: <b>{item.tone}</b>
                  </small>

                  <p className="small text-muted mb-2">
                    {item.emailText}
                  </p>

                  <p className="fw-light">{item.replyText}</p>

                  <div className="d-flex justify-content-end gap-2 mt-3">

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => openEdit(item)}
                    >
                      <FaEdit /> 
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => setDeleteId(item._id)}
                    >
                      <FaTrash /> 
                    </button>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 rounded-4">

              <h5 className="mb-3">Edit Reply</h5>

              <textarea
                className="form-control mb-3"
                rows="5"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal d-block" style={{ background: "#00000080" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 rounded-4">

              <h5 className="mb-3">Confirm Delete</h5>

              <p className="text-muted">
                Are you sure you want to delete this reply?
              </p>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteId)}
                >
                  Yes, Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default MyReplies;