require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();


// Trust Render proxy
app.set("trust proxy", 1);


// Security
app.use(helmet());


// CORS
app.use(
    cors({
        origin: "https://authentication-system-ram.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);


// JSON body parser
app.use(express.json());


// Authentication routes
app.use("/api/auth", authRoutes);


// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Authentication API Running 🚀"
    });
});


// Error handler MUST be last
app.use(errorHandler);


const PORT = process.env.PORT || 5000;


// Start only after MongoDB connects
const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error(
            "❌ Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};


startServer();