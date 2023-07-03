import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_name: {
    type: String,
    required: true,
    trim: true,
  },

  order_pet_id: {
    type: String,
    required: true,
    trim: true,
  },

  order_description: {
    type: String,
    required: true,
    trim: true,
  },
  order_price: {
    type: Number,
    required: true,
    trim: true,
  },
  order_image: {
    type: String,
    required: true,
    trim: true,
  },
  order_category: {
    type: String,
    required: true,
    trim: true,
  },
  order_quantity: {
    type: Number,
    required: true,
    trim: true,
  },

  order_price: {
    type: Number,
    required: true,
    trim: true,
  },

  order_shared_by: {
    type: String,
    required: true,
    trim: true,
  },

  is_active: {
    type: Boolean,
    required: true,
    trim: true,
  },
  is_pickup: {
    type: Boolean,
    required: true,
    trim: true,
  },

  order_status: {
    type: String,
    required: true,
    trim: true,
  },

  ordered_by: {
    type: String,
    required: true,
    trim: true,
  },

  //order type
  order_type: {
    type: String,
    required: true,
    trim: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },

  is_paid: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
