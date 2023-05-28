import Accessories from "../models/Accessories.js";
import User from "../models/Users.js";

export const addAccessories = async (req, res) => {
  const {
    accessories_name,
    accessories_description,
    accessories_price,
    accessories_image,
    accessories_category,
    accessories_quantity,
    accessories_shared_by,
    type,
    phone_number,
  } = req.body;
  try {
    const accessories = await Accessories.create({
      accessories_name,
      accessories_description,
      accessories_price,
      accessories_image,
      accessories_category,
      accessories_quantity,
      accessories_shared_by,
      type,
      is_active: true,
      is_deleted: false,
      phone_number,
    });
    if (accessories) {
      res.status(200).json({
        message: "Accessories added successfully",
        success: true,
        accessory: {
          id: accessories._id,
          accessories_name: accessories.accessories_name,
          accessories_description: accessories.accessories_description,
          accessories_price: accessories.accessories_price,
          accessories_image: accessories.accessories_image,
          accessories_category: accessories.accessories_category,
          accessories_quantity: accessories.accessories_quantity,
          accessories_shared_by: accessories.accessories_shared_by,
          is_active: accessories.is_active,
          is_deleted: accessories.is_deleted,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid Accessory data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAllAccessories = async (req, res) => {
  //return all pets that are not deleted and are active and is available with owner email
  try {
    const accessories = await Accessories.find({
      is_deleted: false,
      is_active: true,
    });
    if (accessories) {
      res.status(200).json({
        message: "All Accessories fetched successfully",
        success: true,
        accessories: accessories,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Accessory data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteAccessory = async (req, res) => {
  //set is deleted to true where id = req.params.id

  console.log(req.params._id);
  try {
    const accessory = await Accessories.findById(req.params._id);
    if (accessory) {
      accessory.is_deleted = true;
      accessory.save();
      res.status(200).json({
        message: "Accessory deleted successfully",
        success: true,
        accessory: accessory,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Accessory data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateAccessory = async (req, res) => {
  const {
    _id,
    accessories_name,
    accessories_description,
    accessories_price,
    accessories_image,
    accessories_category,
    accessories_quantity,
    accessories_shared_by,
  } = req.body;
  try {
    const accessory = await Accessories.findById(_id);
    if (accessory) {
      accessory.accessories_name = accessories_name;
      accessory.accessories_description = accessories_description;
      accessory.accessories_price = accessories_price;
      accessory.accessories_image = accessories_image;
      accessory.accessories_category = accessories_category;
      accessory.pet_quantity = accessories_quantity;
      accessory.pet_shared_by = accessories_shared_by;
      accessory.is_active = true;
      accessory.is_deleted = false;
      accessory.save();
      res.status(200).json({
        message: "Accessory updated successfully",
        success: true,
        accessories: accessory,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Accessory data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAccessoriesBySharedBy = async (req, res) => {
  const { accessories_shared_by } = req.params;
  try {
    //return all pets shared by a particular user where is_deleted = false
    const accessory = await Accessories.find({
      accessories_shared_by: accessories_shared_by,
      is_deleted: false,
    });

    //if pet is an empty array, then no pet is shared by the user
    if (accessory) {
      res.status(200).json({
        message: "Accessories fetched successfully",
        success: true,
        accessories: accessory,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Accessory data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
