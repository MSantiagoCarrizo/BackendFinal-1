import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


const Cart = mongoose.model("cart", cartSchema);
export default Cart;