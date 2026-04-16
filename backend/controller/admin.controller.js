import User from "../models/userSchema.js";

const getAdminDashboard = (req, res) => {
  res.send("Admin Dashboard");
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
};

export { getAdminDashboard, getAllUsers };
