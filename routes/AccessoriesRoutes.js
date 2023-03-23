import express from "express";
import { addAccessories, getAllAccessories, updateAccessory, deleteAccessory, getAccessoriesBySharedBy } from "../controllers/AccessoriesController.js";


const router = express.Router();

// PUBLIC ROUTES
// @desc    Add a new accessory
// @route   POST /api/accessory/add
// @access  Public

router.route("/add").post(addAccessories);



// @desc    Update a pet
// @route   PUT /api/pet/update
// @access  Public

router.route("/update").post(updateAccessory);

//@desc    Get all pet
// @route   GET /api/pet/get
// @access  Public



// @desc    delete pet
// @route   DELETE http://localhost:8000/api/pet/delete/:id
// @access  Public

router.route("/delete/:_id").delete(deleteAccessory);

// // @desc    Getpetbytype
// // @route   GET /api/pet/getpetbytype
// // @access  Public

// router.route("/getpetbytype/:is_free").get(get);

router.route("/getall").get(getAllAccessories);

//@desc  Getpetforcharitableorganization
// @route   GET /api/pet/getpetforcharitableorganization
// @access  Public
// router.route("/getpetforcharitableorganization/:pet_quantity/:is_free").get(getpetForCharitableOrganization);

router.route("/getaccessoriesbysharedby/:accessories_shared_by").get(getAccessoriesBySharedBy);

export default router;