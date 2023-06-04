import Pet from "../models/Pet.js";
import Users from "../models/Users.js";
import Order from "../models/Order.js";
import Notifications from "../models/Notifications.js";
import Accessories from "../models/Accessories.js";

// @desc    Get all ordered food by a user
// @route   GET /api/food/ordered
// @access  Public

export const getOrderedFood = async (req, res) => {
  try {
    const order = await Order.find({ ordered_by: req.params.ordered_by });
    if (order) {
      res.status(200).json({
        message: "Order found",
        success: true,
        order,
      });
    } else {
      res.status(400);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc order food
// @route   POST /api/food/order
// @access  Public

export const orderFood = async (req, res) => {
  try {
    const { order_pet_id, order_quantity, ordered_by, order_type } = req.body;

    //if order_type is pet then do this else do with accessories

    if (order_type === "Pets") {
      const pet = await Pet.findById({ _id: order_pet_id });

      if (order_quantity <= 0) {
        res.status(400);
        throw new Error("Order quantity cannot be 0");
      }

      if (pet) {
        //check if the food_shared_by is same as ordered_by
        if (pet.pet_shared_by == ordered_by) {
          res.status(400);
          throw new Error("You cannot order your own pet");
        }

        //check quantity
        if (pet.pet_quantity >= order_quantity) {
          //check if food is free
          // if (food.is_free) {
          //check if user has already requested for the food
          const order = await Order.findOne({
            order_pet_id: order_pet_id,
            ordered_by: ordered_by,
          });
          if (order?.order_status == "pending") {
            res.status(400);
            throw new Error(
              "You have already requested for this Item Please wait for the owner to accept your request"
            );
          } else {
            //place order by pending status
            const order = new Order({
              order_pet_id,
              order_name: pet.pet_name,
              order_description: pet.pet_description,
              order_price: pet.pet_price * order_quantity,
              order_image: pet.pet_image,
              order_category: pet.pet_category,
              order_quantity,
              order_shared_by: pet.pet_shared_by,
              is_pickup: false,
              is_active: true,
              ordered_by,
              order_status: "pending",
              order_type,
            });
            order.save();

            // issue a notification here
            // send notification to ordered by

            const notifyToSharedBy = new Notifications({
              user_email: pet.pet_shared_by,
              message: "You have a new order request for your food item",
              title: "New Order Request",
              notification_image: order.order_image,
            });

            notifyToSharedBy.save();

            //send notification to orderedby

            const notifyToOrderedBy = new Notifications({
              user_email: ordered_by,
              message: "Your order request has been placed successfully",
              title: "Order Requested",
              notification_image: order.order_image,
            });

            notifyToOrderedBy.save();

            res.status(200).json({
              message: "Order Requested successfully",
              success: true,
              order,
            });
          }
        }
      } else {
        res.status(400);
        throw new Error("Insufficient quantity");
      }
    } else if (order_type === "Accessories") {
      //do the same above but now with accessory
      const accessory = await Accessories.findOne({
        _id: order_pet_id,
      });
      if (accessory) {
        //check if the food_shared_by is same as ordered_by
        if (accessory.accessories_shared_by == ordered_by) {
          res.status(400);
          throw new Error("You cannot order your own accessory");
        }

        //check quantity
        if (accessory.accessories_quantity >= order_quantity) {
          //check if food is free
          // if (food.is_free) {
          //check if user has already requested for the food
          const order = await Order.findOne({
            order_pet_id: order_pet_id,
            ordered_by: ordered_by,
          });
          if (order) {
            res.status(400);
            throw new Error(
              "You have already requested for this accessory Please wait for the owner to accept your request"
            );
          } else {
            //place order by pending status
            const order = new Order({
              order_pet_id,
              order_name: accessory.accessories_name,
              order_description: accessory.accessories_description,
              order_price: accessory.accessories_price * order_quantity,
              order_image: accessory.accessories_image,
              order_category: accessory.accessories_category,
              order_quantity,
              order_shared_by: accessory.accessories_shared_by,
              is_active: true,
              ordered_by,
              order_status: "pending",
              order_type,
              is_pickup: false,
            });
            order.save();

            // issue a notification here
            // send notification to ordered by

            const notifyToSharedBy = new Notifications({
              user_email: accessory.accessories_shared_by,
              message: "You have a new order request for your accessory item",
              title: "New Order Request",
              notification_image: order.order_image,
            });

            notifyToSharedBy.save();

            //send notification to orderedby

            const notifyToOrderedBy = new Notifications({
              user_email: ordered_by,
              message: "Your order request has been placed successfully",
              title: "Order Requested",
              notification_image: order.order_image,
            });

            notifyToOrderedBy.save();

            res.status(200).json({
              message: "Order Requested successfully",
              success: true,
              order,
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    accept order
// @route   POST /api/food/acceptorder
// @access  Public

export const acceptOrder = async (req, res) => {
  try {
    const { order_id, order_pet_id, order_quantity, ordered_by, order_type } =
      req.body;

    if (order_type === "Pets") {
      const order = await Order.findById({ _id: order_id });
      if (order) {
        //check if order is pending
        if (order.order_status === "pending") {
          //check if food quantity is sufficient
          const pet = await Pet.findById({ _id: order_pet_id });
          if (pet) {
            if (pet.pet_quantity >= order_quantity) {
              //deduct food quantity
              pet.pet_quantity = pet.pet_quantity - order_quantity;
              pet.save();
              //update order status to placed
              order.order_status = "placed";
              order.save();

              //send a notification to ordered_by

              const notifyToOrderedBy = new Notifications({
                user_email: order.ordered_by,
                message: "Your order has been accepted successfully",
                title: "Order Accepted",
                notification_image: order.order_image,
              });
              await notifyToOrderedBy.save();

              //notify to order shared by
              const notifyToSharedBy = new Notifications({
                user_email: order.order_shared_by,
                message: "You have Accepted The Order of " + ordered_by,
                title: "Order Accepted",
                notification_image: order.order_image,
              });

              await notifyToSharedBy.save();

              res.status(200).json({
                message: "Order accepted successfully",
                success: true,
                order,
              });
            } else {
              res.status(400);
              throw new Error("Insufficient quantity");
            }
          } else {
            res.status(400);
            throw new Error("Invalid Pet data");
          }
        } else {
          res.status(400);
          throw new Error("Order already accepted");
        }
      } else {
        res.status(400);
        throw new Error("Invalid order data");
      }
    } else if (order_type === "Accessories") {
      const order = await Order.findById({ _id: order_id });
      if (order) {
        //check if order is pending
        if (order.order_status === "pending") {
          //check if food quantity is sufficient
          const pet = await Accessories.findById({ _id: order_pet_id });
          if (pet) {
            if (pet.accessories_quantity >= order_quantity) {
              //deduct food quantity
              pet.accessories_quantity =
                pet.accessories_quantity - order_quantity;
              pet.save();
              //update order status to placed
              order.order_status = "placed";
              order.save();

              //send a notification to ordered_by

              const notifyToOrderedBy = new Notifications({
                user_email: order.ordered_by,
                message: "Your order has been accepted successfully",
                title: "Order Accepted",
                notification_image: order.order_image,
              });
              await notifyToOrderedBy.save();

              //notify to order shared by
              const notifyToSharedBy = new Notifications({
                user_email: order.order_shared_by,
                message: "You have Accepted The Order of " + ordered_by,
                title: "Order Accepted",
                notification_image: order.order_image,
              });

              await notifyToSharedBy.save();

              res.status(200).json({
                message: "Order accepted successfully",
                success: true,
                order,
              });
            } else {
              res.status(400);
              throw new Error("Insufficient quantity");
            }
          } else {
            res.status(400);
            throw new Error("Invalid Accessory data");
          }
        } else {
          res.status(400);
          throw new Error("Order already accepted");
        }
      } else {
        res.status(400);
        throw new Error("Invalid order data");
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc    reject order
// @route   POST /api/food/rejectorder
// @access  Public

export const rejectOrder = async (req, res) => {
  try {
    const { order_id, order_pet_id, order_quantity } = req.body;

    const order = await Order.findById({ _id: order_id });
    if (order) {
      //check if order is pending
      if (order.order_status === "pending") {
        //update order status to rejected
        order.order_status = "rejected";
        order.save();

        //send a notification to ordered_by

        const notifyToOrderedBy = new Notifications({
          user_email: order.ordered_by,
          message: "Your order has been rejected",
          title: "Order Rejected",
          notification_image: order.order_image,
        });
        await notifyToOrderedBy.save();
        //send a notification to ordered_to
        const notifyToOrderedTo = new Notifications({
          user_email: order.order_shared_by,
          message: "You have rejected the order of " + ordered_by,
          title: "Order Rejected",
        });

        await notifyToOrderedTo.save();

        res.status(200).json({
          message: "Order rejected successfully",
          success: true,
          order,
        });
      } else {
        res.status(400);
        throw new Error("Order already accepted");
      }
    } else {
      res.status(400);
      throw new Error("Invalid order data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

//get all pending requests by order shared by a user
export const getPendingRequests = async (req, res) => {
  try {
    const order = await Order.find({
      order_shared_by: req.params.order_shared_by,
      order_status: "pending",
    });

    if (order) {
      res.status(200).json({
        message: "Order found",
        success: true,
        order,
      });
    } else {
      res.status(400);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

//get rejected requests by order shared by a user
export const getRejectedRequests = async (req, res) => {
  try {
    const order = await Order.find({
      order_shared_by: req.params.order_shared_by,
    });
    if (order) {
      res.status(200).json({
        message: "Order found",
        success: true,
        order,
      });
    } else {
      res.status(400);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const orderPickedUp = async (req, res) => {
  try {
    const { order_id, order_shared_by } = req.body;

    const order = await Order.findById({ _id: order_id });
    if (order) {
      //check if order is pending
      if (order.order_status === "placed") {
        //update order status to picked up
        order.is_pickup = true;
        order.is_active = false;
        order.save();
        console.log(order, "order picked up");
        //send a notification to ordered_by

        const notifyToOrderedBy = new Notifications({
          user_email: order.ordered_by,
          message: "Your order has been picked up",
          title: "Order Picked Up",
          notification_image: order.order_image,
        });
        await notifyToOrderedBy.save();
        //send a notification to ordered_to
        const notifyToOrderedTo = new Notifications({
          user_email: order.order_shared_by,
          message: "You have picked up the order of " + order_shared_by,
          title: "Order Picked Up",
        });

        await notifyToOrderedTo.save();

        res.status(200).json({
          message: "Order picked up successfully",
          success: true,
          order,
        });
      } else {
        res.status(400);
        throw new Error("Order already " + order.order_status);
      }
    } else {
      res.status(400);
      throw new Error("Invalid order data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
