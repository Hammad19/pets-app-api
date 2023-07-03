import express from "express";
import { addDoctor, getallDoctors } from "../controllers/DoctorController";

const router = express.Router();

// PUBLIC ROUTES
// @desc    Add a new accessory
// @route   POST /api/accessory/add
// @access  Public

router.route("/").get(getallDoctors);

// @desc    Update a pet
// @route   PUT /api/pet/update
// @access  Public

router.route("/").post(addDoctor);

export default router;
