import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { register } from "../services/authService";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
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
    setValidationErrors([]);
    setLoading(true);

    try {
        const data = await register(formData);

        console.log("Register response:", data);

        setMessage(data.message);

    } catch (error) {

        console.log("Register error:", error);

        setError(error.message);

        if (error.errors && error.errors.length > 0) {
            setValidationErrors(error.errors);
        }

    } finally {
        setLoading(false);
    }
};

    return (
    <div className="auth-page">

        <div className="auth-card">

            <h1>Create Account</h1>

            <p className="auth-subtitle">
                Register for a new account
            </p>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />

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
                    Register
                </Button>

            </form>

           {error && (
    <div className="error-box">

        <strong>❌ {error}</strong>

        {validationErrors.length > 0 && (
            <ul className="validation-list">

                {validationErrors.map((item, index) => (
                    <li key={index}>
                        <strong>
                            {item.field.charAt(0).toUpperCase() +
                                item.field.slice(1)}
                        </strong>

                        <span>
                            {item.message}
                        </span>
                    </li>
                ))}

            </ul>
        )}

    </div>
)}

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            <div className="auth-footer">

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>

    </div>
);
}

export default Register;