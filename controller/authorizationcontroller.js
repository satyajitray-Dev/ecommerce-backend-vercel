import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Verify header existence and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "Access denied. No valid token provided."
      });
    }

    // 2. Extract token safely
    const token = authHeader.split(" ")[1];

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "Invalid token format."
      });
    }

    // 3. Verify token payload
    const decode = jwt.verify(token, process.env.secret_key);

    // 4. Verify admin permissions
    if (decode.role !== "admin") {
      return res.status(403).json({
        status: "failed",
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    req.user = decode;
    next();
  } catch (err) {
    console.error(err);

    // Handle expired or invalid JWT explicitly
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "Invalid or expired token. Please log in again."
      });
    }

    return res.status(500).json({
      status: "failed",
      success: false,
      message: "Internal server error"
    });
  }
};