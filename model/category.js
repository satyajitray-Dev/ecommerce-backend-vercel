import mongoose from "mongoose";
const category= mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
       // match: [/^https?:\/\/.+/, "category image must be a valid URL"]
    },
    slug:{
        type: String,
        required: [true,"slug is required"]
    }
}
)
const categoryschema= mongoose.model("category",category);
export default categoryschema;
