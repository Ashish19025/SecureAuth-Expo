// middleware/auth.js
const { verifyToken } = require("@clerk/backend");



module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = await verifyToken(
      token,
      {
        secretKey: process.env.CLERK_SECRET_KEY,
      }
    );

    req.auth = payload;
    console.log("Auth payload:", payload.sub);
    next();

  } catch (err) {
    console.log("JWT verification failed:");
    console.error("Error verifying token:", err);

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};