import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "strict"
    });

    res.json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};