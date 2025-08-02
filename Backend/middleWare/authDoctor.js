import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

   const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
  console.log("Decoded Token:", decoded);
  req.doctorId = decoded.id;

    next();
  } catch (error) {
    {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }
    console.log("Error in authDoctor:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};}


export default authDoctor;