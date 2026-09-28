import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required"]

    },
    email: {
        required: [true,"email required"],
        type: String,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"]
    },
    password: {
        type: String,
        required: [true,"password must required"],
        minlength: [6,"passord must be  at least 6 character"]
    },
     id: {
        type: Number,
        unique: [true,"enter new id"]
    },
    role: {
        required: [true,"must required"],
        type: String,
        default: "user"

    },
    avatar: {
        type: String,
        required: [true,"avatar must be required"],
    }
},{
            timestamps: true
        
});
const userSchema=mongoose.model("user",schema);
    
export default userSchema;
