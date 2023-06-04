import mongoose from "mongoose";

const AccessoriesSchema = new mongoose.Schema({
  // Accessories Name
  accessories_name: {
    type: String,
    required: true,
    trim: true,
  },

  // Accessories Description
  accessories_description: {
    type: String,
    required: true,
    trim: true,
  },

  // Accessories Price

  accessories_price: {
    type: Number,
    required: true,
    trim: true,
  },

  // Accessories Image
  accessories_image: {
    type: String,
    required: true,
    trim: true,
  },

  // Accessories Category
  accessories_category: {
    type: String,
    required: true,
    trim: true,
  },

  // Accessories quantity
  accessories_quantity: {
    type: Number,
    required: true,
    trim: true,
  },

  // Accessories shared by
  accessories_shared_by: {
    type: String,
    required: true,
    trim: true,
  },

  //accessories_rating
  accessories_rating: {
    type: Number,
    required: false,
    trim: true,
    default: 0,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
  },

  //is active
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },

  //is deleted
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },

  //accessories type
  type: {
    type: String,
    required: true,
    trim: true,
  },

  //created at
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Accessories = mongoose.model("Accessories", AccessoriesSchema);
export default Accessories;
