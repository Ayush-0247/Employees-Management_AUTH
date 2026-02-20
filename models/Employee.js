// employee model

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  salary: Number
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);