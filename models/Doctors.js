import mongoose from "mongoose";

// User Schema Definition
const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  contact: {
    type: String,
    required: false,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

// Define User Model
const Doctor = mongoose.model("doctor", DoctorSchema);

export default Doctor;
