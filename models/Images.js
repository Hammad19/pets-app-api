import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  petImg: {
    type: String,
  },
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
