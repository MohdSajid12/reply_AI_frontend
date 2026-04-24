import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReplyGenerator from "./components/ReplyGenerator";
import MyReplies from "./pages/MyReplies";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <ReplyGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-replies"
          element={
            <ProtectedRoute>
              <MyReplies />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;