import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    // ✅ 1. Cookie (Web)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ 2. Header (React Native)
    else if (req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
