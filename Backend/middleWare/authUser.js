import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
      const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authUser;



