import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    // ✅ check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 🔐 generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 🍪 COOKIE SET
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // https me hi send hoga
      sameSite: "None", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ response
    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, gameUID } = req.body;

    // ✅ Required fields check
    if (!name || !email || !password || !gameUID) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // ✅ Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // 🔐 Strong password (optional but recommended)
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 1 uppercase, 1 number and 1 special character.",
      });
    }

    // ✅ Check existing user
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(409).json({ message: "User already exists." });
    }

    // 🔐 Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      gameUID,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { login, register, logout, getMe };
