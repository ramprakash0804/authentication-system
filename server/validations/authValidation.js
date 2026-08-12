const { body } = require("express-validator");

const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
];

const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

const changePasswordValidation = [
    body("oldPassword")
        .notEmpty()
        .withMessage("Old password is required"),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters")
];

const forgotPasswordValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email")
];

const resetPasswordValidation = [
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
];

const updateProfileValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("phone")
        .optional()
        .trim()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Please enter a valid 10-digit phone number"),

    body("gender")
        .optional()
        .isIn([
            "Male",
            "Female",
            "Other",
            "Prefer not to say"
        ])
        .withMessage("Please select a valid gender"),

    body("dateOfBirth")
        .optional()
        .isISO8601()
        .withMessage("Please enter a valid date of birth"),

    body("city")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("City must be between 2 and 100 characters")
];

module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    updateProfileValidation
};