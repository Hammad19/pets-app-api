// Create User Controller
import Pet from "../models/Pet.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

// const Category = require("../models/category")
// @desc    Add a new pet
// @route   POST http://localhost:8000/api/pet/add
// @access  Public
export const addPet = async (req, res) => {
  const {
    pet_name,
    pet_description,
    pet_price,
    pet_image,
    pet_category,
    pet_quantity,
    pet_shared_by,
    type,
    phone_number,
  } = req.body;
  try {
    const pet = await Pet.create({
      pet_name,
      pet_description,
      pet_price,
      pet_image,
      pet_category,
      pet_quantity,
      pet_shared_by,
      type,
      is_active: true,
      is_deleted: false,
      phone_number,
    });
    if (pet) {
      res.status(200).json({
        message: "Pet added successfully!",
        success: true,
        petItem: {
          id: pet._id,
          pet_name: pet.pet_name,
          pet_description: pet.pet_description,
          pet_price: pet.pet_price,
          pet_image: pet.pet_image,
          pet_category: pet.pet_category,
          pet_quantity: pet.pet_quantity,
          pet_shared_by: pet.pet_shared_by,
          is_active: pet.is_active,
          is_available: pet.is_available,
          phone_number: pet.phone_number,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid pet data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    Get all pet
// @route   GET http://localhost:8080/api/pet/getall
// @access  Public
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({
      is_deleted: false,
      is_active: true,
      is_available: true,
    });

    if (pets) {
      // Sort pets by pet_rating in descending order
      pets.sort((a, b) => b.pet_rating - a.pet_rating);

      console.log(pets);
      res.status(200).json({
        message: "All pets fetched successfully!",
        success: true,
        pet: pets,
      });
    } else {
      res.status(400);
      throw new Error("Invalid pet data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    delete pet
// @route   DELETE http://localhost:8000/api/pet/delete
// @access  Public
export const deletePet = async (req, res) => {
  //set is deleted to true where id = req.params.id

  console.log(req.params._id);
  try {
    const pet = await Pet.findById(req.params._id);
    if (pet) {
      pet.is_deleted = true;
      pet.save();
      res.status(200).json({
        message: "Pet deleted successfully!",
        success: true,
        pet: pet,
      });
    } else {
      res.status(400);
      throw new Error("Invalid pet data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    Update a pet
// @route   PUT http://localhost:8000/api/pet/update
// @access  Public
export const updatePet = async (req, res) => {
  const {
    _id,
    pet_name,
    pet_description,
    pet_price,
    pet_image,
    pet_category,
    pet_quantity,
    pet_shared_by,
  } = req.body;
  try {
    const pet = await Pet.findById(_id);
    if (pet) {
      pet.pet_name = pet_name;
      pet.pet_description = pet_description;
      pet.pet_price = pet_price;
      pet.pet_image = pet_image;
      pet.pet_category = pet_category;
      pet.pet_quantity = pet_quantity;
      pet.pet_shared_by = pet_shared_by;
      // pet.is_free = is_free;
      pet.is_active = true;
      pet.is_deleted = false;
      pet.save();
      res.status(200).json({
        message: "Pet updated successfully!",
        success: true,
        petItem: pet,
      });
    } else {
      res.status(400);
      throw new Error("Invalid pet data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    getPetbysharedby
// @route   GET http://localhost:8000/api/pet/getpetbysharedby
// @access  Public

//@desc getpetbysharedby
// @route   GET /api/pet/getpetbysharedby
// @access  Public
export const getPetBySharedBy = async (req, res) => {
  const { pet_shared_by } = req.params;
  try {
    //return all pets shared by a particular user where is_deleted = false
    const pet = await Pet.find({
      pet_shared_by: pet_shared_by,
      is_deleted: false,
    });

    //if pet is an empty array, then no pet is shared by the user
    if (pet) {
      //console.log(pet);
      //return petItems array
      return res.status(200).json({
        message: "Pets fetched successfully",
        success: true,
        pet: pet,
      });
    } else {
      res.status(400);
      throw new Error("Invalid pet data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getFoodByType = async (req, res) => {
  const { is_free } = req.params;
  try {
    const food = await Food.find({
      is_free: is_free,
      is_deleted: false,
      is_active: true,
    });
    if (food) {
      res.status(200).json({
        message: "Food fetched successfully",
        success: true,
        food: food,
      });
    } else {
      res.status(400);
      throw new Error("Invalid food data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

//Search foods by name like
// @desc    searchfoodbyname

// @route   GET http://localhost:8000/api/food/searchfoodbyname
// @access  Public
export const searchPetByName = async (req, res) => {
  const { pet_name } = req.params;
  try {
    const pet = await Pet.find({
      pet_name: { $regex: pet_name, $options: "i" },
      is_deleted: false,
      is_active: true,
    });
    if (pet) {
      res.status(200).json({
        message: "Food fetched successfully",
        success: true,
        pet: pet,
      });
    } else {
      res.status(400);
      throw new Error("Invalid food data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
