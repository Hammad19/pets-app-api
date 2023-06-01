import mongoose from "mongoose";

// User Schema Definition
const PetSchema = new mongoose.Schema({
  // Pet Name
  pet_name: {
    type: String,
    required: true,
    trim: true,
  },

  // Pet Description
  pet_description: {
    type: String,
    required: true,
    trim: true,
  },

  // Pet Price

  pet_price: {
    type: Number,
    required: true,
    trim: true,
  },

  // Pet Image
  pet_image: {
    type: String,
    required: true,
    trim: true,
  },

  // Pet Category
  pet_category: {
    type: String,
    required: true,
    trim: true,
  },

  // Pet quantity
  pet_quantity: {
    type: Number,
    required: true,
    trim: true,
  },

  // Pet shared by
  pet_shared_by: {
    type: String,
    required: true,
    trim: true,
  },

  phone_number: {
    type: String,
    required: true,
    trim: true,
  },

  // // is free
  // is_free: {
  //     type: Boolean,
  //     required: true,
  //     trim: true,
  // },
  //is active
  is_active: {
    type: Boolean,
    required: false,
    trim: true,
    default: true,
  },
  // is available
  is_deleted: {
    type: Boolean,
    required: false,
    trim: true,
    default: true,
  },

  pet_rating: {
    type: Number,
    required: false,
    trim: true,
    default: 0,
  },

  // Pet Created Date
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // category:{
  //     type: ObjectId,
  //     ref:"Catregory",
  //     required: [true,'Product must belong to a category']
  // }
});

// define Pet model

const Pet = mongoose.model("pet", PetSchema);

export default Pet;
