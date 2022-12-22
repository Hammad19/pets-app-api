import express from "express";
import { addAccessories, getAllAccessories, updateAccessory, deleteAccessory, getAccessoriesBySharedBy } from "../controllers/AccessoriesController.js";


const router = express.Router();

// PUBLIC ROUTES
// @desc    Add a new accessory
// @route   POST /api/accessory/add
// @access  Public

router.route("/add").post(addAccessories);



// @desc    Update a food
// @route   PUT /api/food/update
// @access  Public

router.route("/update").post(updateAccessory);

//@desc    Get all food
// @route   GET /api/food/get
// @access  Public



// @desc    delete food
// @route   DELETE http://localhost:8000/api/food/delete/:id
// @access  Public

router.route("/delete/:_id").delete(deleteAccessory);

// // @desc    Getfoodbytype
// // @route   GET /api/food/getfoodbytype
// // @access  Public

// router.route("/getfoodbytype/:is_free").get(get);

router.route("/getall").get(getAllAccessories);

//@desc  Getfoodforcharitableorganization
// @route   GET /api/food/getfoodforcharitableorganization
// @access  Public
// router.route("/getfoodforcharitableorganization/:food_quantity/:is_free").get(getFoodForCharitableOrganization);

router.route("/getaccessoriesbysharedby/:accessories_shared_by").get(getAccessoriesBySharedBy);

export default router;