import mongoose from "mongoose";

// Review Schema Definition
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
  },
  //keep an array of user id with its email

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  user_email: {
    type: String,
    required: true,
    trim: true,
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },

  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pet",
  },

  ratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  ratedBy_email: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Review Model
const Review = mongoose.model("review", ReviewSchema);

export default Review;
