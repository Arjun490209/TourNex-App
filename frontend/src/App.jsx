import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Desktop from "./pages/desktop/Desktop";
import DesktopHome from "./pages/desktop/pages/DesktopHome";
import User from "./pages/desktop/pages/User";
import Tournaments from "./pages/desktop/pages/Tournaments";
import Settings from "./pages/desktop/pages/Settings";
import Matches from "./pages/desktop/pages/Matches";
import Leaderboard from "./pages/desktop/pages/Leaderboard";
import Wallet from "./pages/desktop/pages/Wallet";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/slices/authSlice";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/desktop/AdminRoute";
import CreateRoom from "./pages/desktop/pages/CreateRoom";
import UpdateRoom from "./pages/desktop/pages/UpdateRoom";

export const api = import.meta.env.VITE_API_URL || "https://tournex-app-backend.onrender.com/api";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="/admin" element={<Login />} />

        {/* Desktop */}
        <Route
          path="/desktop"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Desktop />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<DesktopHome />} />
          <Route path="users" element={<User />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="matches" element={<Matches />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="create-room/:id" element={<CreateRoom />} />
          <Route path="update-room/:id" element={<UpdateRoom />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
