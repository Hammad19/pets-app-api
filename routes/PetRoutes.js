// Create User Routes
import express from "express";
import { addPet, getAllPets, updatePet, deletePet, getPetBySharedBy,searchPetByName } from "../controllers/PetController.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

// PUBLIC ROUTES
// @desc    Add a new pet
// @route   POST /api/pet/add
// @access  Public

router.route("/add").post(addPet);



// @desc    Update a pet
// @route   PUT /api/pet/update
// @access  Public

router.route("/update").post(updatePet);

//@desc    Get all pet
// @route   GET /api/pet/get
// @access  Public



// @desc    delete pet
// @route   DELETE http://localhost:8000/api/pet/delete/:id
// @access  Public

router.route("/delete/:_id").delete(deletePet);

// // @desc    Getpetbytype
// // @route   GET /api/pet/getpetbytype
// // @access  Public

// router.route("/getpetbytype/:is_free").get(get);

router.route("/getall").get(getAllPets);

//@desc  Getpetforcharitableorganization
// @route   GET /api/pet/getPetforcharitableorganization
// @access  Public
// router.route("/getpetforcharitableorganization/:pet_quantity/:is_free").get(getPetForCharitableOrganization);

router.route("/getpetbysharedby/:pet_shared_by").get(getPetBySharedBy);


// @desc    delete pet
// @route   DELETE http://localhost:8000/api/pet/delete/:id
// @access  Public

router.route("/delete/:_id").delete(deletePet);

router.route("/:pet_name").get(searchPetByName);

export default router;