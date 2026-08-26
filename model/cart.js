import mongoose from "mongoose";

const cart=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items:[
        {
            productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "prosuct",
            required: true
        },
    
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }

    ]

})
const cartschema=mongoose.model("cart",cart);
export default cartschema;
