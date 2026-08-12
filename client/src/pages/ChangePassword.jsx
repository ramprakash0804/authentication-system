import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";

function ChangePassword() {
    const { accessToken } = useAuth();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
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

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await changePassword(
                accessToken,
                formData.oldPassword,
                formData.newPassword
            );

            setMessage(response.message);

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

   return (
    <div className="auth-page">

        <div className="auth-card">

            <h1>Change Password</h1>

            <p className="auth-subtitle">
                Update your account password
            </p>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Current Password"
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                />

                <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                />

                <Input
                    label="Confirm New Password"
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
                    Change Password
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

                <button
                    className="secondary-button"
                    onClick={() => window.history.back()}
                >
                    Back to Profile
                </button>

            </div>

        </div>

    </div>
);
}

export default ChangePassword;