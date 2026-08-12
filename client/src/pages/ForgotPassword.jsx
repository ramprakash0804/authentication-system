import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await forgotPassword(email);

            setMessage(response.message);

            setEmail("");

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="auth-page">

        <div className="auth-card">

            <h1>Forgot Password?</h1>

            <p className="auth-subtitle">
                Enter your email and we'll send you a
                password reset link.
            </p>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />

                <Button
                    type="submit"
                    loading={loading}
                >
                    Send Reset Link
                </Button>

            </form>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            <div className="auth-footer">

                <p>
                    Remember your password?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>

    </div>
);
}

export default ForgotPassword;