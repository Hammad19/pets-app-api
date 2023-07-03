import Doctor from "../models/Doctors.js";

// @desc    Add a new doctor
// @route   POST /api/doctor/add
// @access  Public
export const addDoctor = async (req, res) => {
  const { name, area, contact } = req.body;
  try {
    const doctor = await Doctor.create({
      name,
      area,
      contact,
    });
    if (doctor) {
      res.status(200).json({
        message: "Doctor added successfully!",
        success: true,
        doctorItem: {
          name,
          area,
          contact,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid doctor data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctor/get
// @access  Public

export const getallDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if (doctors) {
      res.status(200).json({
        message: "Doctors fetched successfully!",
        success: true,
        doctors,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
