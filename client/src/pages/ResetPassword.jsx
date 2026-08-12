import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword(
                token,
                formData.password
            );

            setMessage(response.message);

            setFormData({
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="auth-page">

        <div className="auth-card">

            <h1>Reset Password</h1>

            <p className="auth-subtitle">
                Create a new password for your account.
            </p>

            <form onSubmit={handleSubmit}>

                <Input
                    label="New Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                />

                <Button
                    type="submit"
                    loading={loading}
                >
                    Reset Password
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

        </div>

    </div>
);
}

export default ResetPassword;