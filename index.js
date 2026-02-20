// All imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";

// Dotenv configuration
dotenv.config();


// DB connection
connectDB();

const app = express();

app.use(express.json());


// data summision URL
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// routes setup
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);


// path basic
app.use("/", viewRoutes);



// ejs  set-ups
app.set("view engine", "ejs");
app.set("views", "./views");


// routes  testing
app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

const PORT = process.env.PORT || 5000;


//  server starting
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});