const bcrypt = require("bcryptjs");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");


const sendEmail = require("../utils/sendEmail");

const {
    successResponse,
    errorResponse
} = require("../utils/apiResponse");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return errorResponse(
                res,
                400,
                "All fields are required"
            );

        }

        const userExists = await User.findOne({ email });

        if (userExists) {

            return errorResponse(
                res,
                400,
                "User already exists"
            );

        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Generate verification token
        const verificationToken =
            crypto.randomBytes(32).toString("hex");

        // Hash verification token before storing it
        const hashedVerificationToken =
            crypto
                .createHash("sha256")
                .update(verificationToken)
                .digest("hex");

        // Create user
        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            emailVerified: false,

            emailVerificationToken:
                hashedVerificationToken,

            emailVerificationExpires:
                Date.now() + 15 * 60 * 1000

        });

        // Create verification URL
        const verificationURL =
            `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        // Email content
        const html = `
            <h2>Verify Your Email</h2>

            <p>Hello ${user.name},</p>

            <p>
                Thank you for registering.
                Please verify your email address
                by clicking the button below.
            </p>

            <a href="${verificationURL}"
               style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:5px;
               ">
                Verify Email
            </a>

            <p>
                This verification link will expire
                in 15 minutes.
            </p>
        `;

        // Send verification email
        console.log("📧 Sending verification email to:", user.email);

        await sendEmail(
            user.email,
            "Verify Your Email",
            html
        );
        console.log("✅ Verification email sent successfully");
        return successResponse(
            res,
            201,
            "Registration successful. Please verify your email."
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        if (!user.emailVerified) {
            return errorResponse(
                res,
                403,
                "Please verify your email before logging in"
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m"
            }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d"
            }
        );

        user.refreshToken = refreshToken;

        await user.save();

        return successResponse(
            res,
            200,
            "Login Successful",
            {
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select(
                "-password -refreshToken -passwordResetToken -passwordResetExpires"
            );

        if (!user) {
            return errorResponse(
                res,
                404,
                "User not found"
            );
        }

        return successResponse(
            res,
            200,
            "Profile fetched successfully",
            {
                id: user._id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,

                // Profile information
                phone: user.phone,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                city: user.city
            }
        );

    } catch (error) {
        return errorResponse(
            res,
            500,
            error.message
        );
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            phone,
            gender,
            dateOfBirth,
            city
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update only the allowed profile fields
        if (name !== undefined) {
            user.name = name;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (gender !== undefined && gender !== "") {
            user.gender = gender;
        }

        if (dateOfBirth !== undefined) {
            user.dateOfBirth = dateOfBirth;
        }

        if (city !== undefined) {
            user.city = city;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                phone: user.phone,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                city: user.city
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message: "Old password and new password are required"
            });

        }

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password changed successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return errorResponse(
                res,
                400,
                "Current password is required"
            );
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return errorResponse(
                res,
                404,
                "User not found"
            );
        }

        // Verify current password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return errorResponse(
                res,
                400,
                "Current password is incorrect"
            );
        }

        // Delete the account
        await User.findByIdAndDelete(user._id);

        return successResponse(
            res,
            200,
            "Account deleted successfully"
        );

    } catch (error) {
        return errorResponse(
            res,
            500,
            error.message
        );
    }
};

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

        return errorResponse(res, 404, "User not found");

    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken =
        crypto.createHash("sha256")
            .update(resetToken)
            .digest("hex");

    user.passwordResetExpires =
        Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `

        <h2>Password Reset</h2>

        <p>Click below to reset your password.</p>

        <a href="${resetURL}">
            Reset Password
        </a>

    `;

    await sendEmail(

        user.email,

        "Reset Password",

        html

    );

    return successResponse(

        res,

        200,

        "Password reset email sent."

    );

};

const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        if (!password) {

            return errorResponse(
                res,
                400,
                "Password is required"
            );

        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({

            passwordResetToken: hashedToken,

            passwordResetExpires: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return errorResponse(
                res,
                400,
                "Invalid or expired reset token"
            );

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        return successResponse(
            res,
            200,
            "Password reset successful"
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }

};

const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return errorResponse(
                res,
                401,
                "Refresh token is required"
            );
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return errorResponse(
                res,
                401,
                "Invalid refresh token"
            );
        }

        const newAccessToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m"
            }
        );

        return successResponse(
            res,
            200,
            "Access token refreshed successfully",
            {
                accessToken: newAccessToken
            }
        );

    } catch (error) {

        return errorResponse(
            res,
            401,
            "Invalid or expired refresh token"
        );
    }
};

const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return errorResponse(
                res,
                400,
                "Refresh token is required"
            );
        }

        const user = await User.findOne({
            refreshToken: refreshToken
        });

        if (!user) {
            return errorResponse(
                res,
                401,
                "Invalid refresh token"
            );
        }

        user.refreshToken = null;

        await user.save();

        return successResponse(
            res,
            200,
            "Logout successful"
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );
    }
};

const verifyEmail = async (req, res) => {

    try {

        const { token } = req.params;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpires: {
                $gt: Date.now()
            }
        });

        if (!user) {

            return errorResponse(
                res,
                400,
                "Invalid or expired verification token"
            );

        }

        user.emailVerified = true;

        user.emailVerificationToken = undefined;

        user.emailVerificationExpires = undefined;

        await user.save();

        return successResponse(
            res,
            200,
            "Email verified successfully"
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            error.message
        );

    }
};
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
    logoutUser,
    verifyEmail
};