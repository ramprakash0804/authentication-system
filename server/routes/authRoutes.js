const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const authLimiter = require("../middleware/rateLimitMiddleware");

const {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    updateProfileValidation
} = require("../validations/authValidation");

const {
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
    verifyEmail,
   } = require("../controllers/authController");


// =========================
// PUBLIC ROUTES
// =========================

router.post(
    "/register",
    authLimiter,
    registerValidation,
    validate,
    registerUser
);

router.post(
    "/login",
    authLimiter,
    loginValidation,
    validate,
    loginUser
);

router.post(
    "/forgot-password",
    authLimiter,
    forgotPasswordValidation,
    validate,
    forgotPassword
);

router.post(
    "/reset-password/:token",
    authLimiter,
    resetPasswordValidation,
    validate,
    resetPassword
);

router.post(
    "/refresh-token",
    refreshAccessToken
);

router.get(
    "/verify-email/:token",
    verifyEmail
);


// =========================
// PROTECTED ROUTES
// =========================

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfileValidation,
    validate,
    updateProfile
);

router.put(
    "/change-password",
    protect,
    changePasswordValidation,
    validate,
    changePassword
);

router.delete(
    "/delete-account",
    protect,
    deleteAccount
);

router.post(
    "/logout",
    logoutUser
);


module.exports = router;