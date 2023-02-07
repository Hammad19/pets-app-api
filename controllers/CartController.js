import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  //check if the cart already exists for the user
    const {pet,accessory,user } = req.body;
    try {
        const cart = await Cart.findOne
        ({orderedBy: user});
        if (cart) {
            //check if pet is already there in cart
            let promise = cart.pets.find((c) => c.pet == pet);
            if (promise) {
                //update the quantity and price
                Cart.findOneAndUpdate(

                    { orderedBy: user, "pets.pet": pet },
                    { $inc: { "pets.$.count": 1 } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            } else {
                //add the pet with quantity 1
                Cart.findOneAndUpdate(
                    { orderedBy: user },
                    { $push: { pets: { pet, count: 1 } } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            }

            //check if accessory is already there in cart

            let promise1 = cart.accessories.find((c) => c.accessory == accessory);
            if (promise1) {

                //update the quantity and price
                Cart.findOneAndUpdate(

                    { orderedBy: user, "accessories.accessory": accessory },
                    { $inc: { "accessories.$.count": 1 } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            }


            else {
                //add the pet with quantity 1
                Cart.findOneAndUpdate(
                    { orderedBy: user },
                    { $push: { accessories: { accessory, count: 1 } } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            }


        } else {
            //if cart does not exist create a new cart
            const cart = await Cart.create({
                pets: [{ pet, count: 1 }],
                orderedBy: user,
            });
            if (cart) {
                res.status(200).json({ cart });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }

}

export const getCart = async (req, res) => {

    //get  id
    const { user } = req.params;


    try {
        const cart = await Cart.findOne({ orderedBy: user }).populate("pets.pet").populate("accessories.accessory");
        if (cart) {
            res.status(200).json({ cart });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
}

export const removefromCart = async (req, res) => {
    const { pet, accessory, user } = req.body;
    try {
        if (pet) {
            const cart = await Cart.findOneAndUpdate(
                { orderedBy: user },
                { $pull: { pets: { pet } } },
                { new: true }
            ).populate("pets.pet");
            if (cart) {
                res.status(200).json({ cart });
            }
        }
        if (accessory) {
            const cart = await Cart.findOneAndUpdate(
                { orderedBy: user },
                { $pull: { accessories: { accessory } } },
                { new: true }
            ).populate("accessories.accessory");
            if (cart) {
                res.status(200).json({ cart });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
}



export const addpettocart = async (req, res) => {
    const { pet, user } = req.body;
    try {
        const cart = await Cart.findOne
        ({orderedBy: user});
        if (cart) {


            //check if pet is already there in cart
            let promise = cart.pets.find((c) => c.pet == pet);
            if (promise) {
                //update the quantity and price
                Cart.findOneAndUpdate(

                    { orderedBy: user, "pets.pet": pet },
                    { $inc: { "pets.$.count": 1 } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            } else {
                //add the pet with quantity 1
                Cart.findOneAndUpdate(
                    { orderedBy: user },
                    { $push: { pets: { pet, count: 1 } } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }

}

export const addaccessorytocart = async (req, res) => {
    const { accessory, user } = req.body;
    try {
        const cart = await Cart.findOne
        ({orderedBy: user});
        if (cart) {


            //check if accessory is already there in cart
            let promise = cart.accessories.find((c) => c.accessory == accessory);
            if (promise) {
                //update the quantity and price
                Cart.findOneAndUpdate(

                    { orderedBy: user, "accessories.accessory": accessory },
                    { $inc: { "accessories.$.count": 1 } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            } else {
                //add the pet with quantity 1
                Cart.findOneAndUpdate(
                    { orderedBy: user },
                    { $push: { accessories: { accessory, count: 1 } } },
                    { new: true }
                ).exec((err, result) => {
                    if (err) return res.status(400).json({ err });
                    if (result) {
                        res.status(200).json({ result });
                    }
                }
                );
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }



}







