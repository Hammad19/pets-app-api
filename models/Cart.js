import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({

    pets: [
        {
            pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
            count: Number,

        }
    ],

    accessories: [
        {
            accessories: { type: mongoose.Schema.Types.ObjectId, ref: 'Accessories' },
            count: Number,

        }
    ],

    

    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);

