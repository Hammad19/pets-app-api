import Review from "../models/review.js";
import User from "../models/Users.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private

export const createReview = async (req, res) => {
  const { review, rating, user, ratedBy } = req.body;

  try {
    const newReview = await Review.create({
      review,
      rating,
      user,
      ratedBy: ratedBy,
    });
    if (newReview) {
      const newUser = await User.findOneAndUpdate(
        { _id: user },
        { $push: { reviews: newReview._id } },
        { new: true }
      );
      if (newUser) {
        res.status(200).json({ newReview });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getReviews = async (req, res) => {
  //get  id
  const { user } = req.params;

  try {
    const reviews = await Review.find({ user: user }).populate("user");
    if (reviews) {
      res.status(200).json({ reviews });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
