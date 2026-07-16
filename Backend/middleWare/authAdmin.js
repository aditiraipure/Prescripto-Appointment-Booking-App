import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({ success: false, message: "Token missing. Not authorized." });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Invalid admin credentials." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Error in authAdmin:', error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
  }
};


export default authAdmin;


