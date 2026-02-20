// all routes for viesw

import express from "express";
import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// auth check
const checkAuth = (req) => {
  const token = req.cookies.token;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

// Login 
router.get("/", (req, res) => {
  res.render("login", { error: null });
});


// login form submit
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.render("login", { error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
});



// dashboard
router.get("/dashboard", async (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");

  const employees = await Employee.find();
  res.render("dashboard", { employees });
});



// add employee 
router.get("/add", (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");
  res.render("addEmployee");
});


// Add employee submit
router.post("/add", async (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");
  await Employee.create(req.body);
  res.redirect("/dashboard");
});


// edit page
router.get("/edit/:id", async (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");
  const employee = await Employee.findById(req.params.id);
  res.render("editEmployee", { employee });
});


// Edit submit
router.post("/edit/:id", async (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/dashboard");
});



// Delete employee
router.get("/delete/:id", async (req, res) => {
  if (!checkAuth(req)) return res.redirect("/");
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});

// logout 
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;