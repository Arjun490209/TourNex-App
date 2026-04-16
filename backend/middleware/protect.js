import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 IMPORTANT
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
