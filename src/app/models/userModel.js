import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?\d{10,15}$/, "Invalid phone number format"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    fullName: {
        type: String,
        required: [true, "Please provide a Full Name"],
    },
    avatar: {
        type: String,
    },
    major: {
        type: String,
        required: [true, "Please provide a major"],
    },
    status: {
        type: String,
        required: true
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})


const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User;