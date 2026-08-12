import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
        setLoading(true);

        try {
            const data = await login(formData);

            console.log("Login response:", data);

            setMessage(data.message);

            navigate("/dashboard");

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

   return (
    <div className="auth-page">

        <div className="auth-card">

            <h1>Welcome Back</h1>

            <p className="auth-subtitle">
                Login to your account
            </p>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />

                <Button
                    type="submit"
                    loading={loading}
                >
                    Login
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
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>
                </p>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>

    </div>
);
}

export default Login;