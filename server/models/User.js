const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        // Profile Information

        phone: {
            type: String,
            default: ""
        },

        gender: {
            type: String,
            enum: [
                "Male",
                "Female",
                "Other",
                "Prefer not to say"
            ],
            default: null
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        city: {
            type: String,
            default: "",
            trim: true
        },

        profilePhoto: {
            type: String,
            default: ""
        },

        // Password Reset
        passwordResetToken: {
            type: String
        },

        passwordResetExpires: {
            type: Date
        },

        // Refresh Token
        refreshToken: {
            type: String,
            default: null
        },

        // Email Verification
        emailVerified: {
            type: Boolean,
            default: false
        },

        emailVerificationToken: {
            type: String
        },

        emailVerificationExpires: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);