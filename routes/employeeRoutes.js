import express from "express";
import { verifyToken } from "../controllers/verifyToken.js";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", verifyToken, createEmployee);
router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployeeById);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

export default router;