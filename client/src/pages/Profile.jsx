import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import {
    getProfile,
    updateProfile,
    deleteAccount
} from "../services/authService";

function Profile() {

    const { accessToken, logout, updateUser } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        city: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const [deleteStep, setDeleteStep] = useState(1);

    // Fetch profile
    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response =
                    await getProfile(accessToken);

                const profile =
                    response.user || response.data;

                setUser(profile);

                setFormData({
                    name: profile.name || "",
                    phone: profile.phone || "",
                    gender: profile.gender || "",
                    dateOfBirth: profile.dateOfBirth
                        ? profile.dateOfBirth.split("T")[0]
                        : "",
                    city: profile.city || ""
                });

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        if (accessToken) {
            fetchProfile();
        }

    }, [accessToken]);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleEdit = () => {

        setMessage("");
        setError("");
        setEditing(true);

    };


    const handleCancel = () => {

        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            gender: user?.gender || "",
            dateOfBirth: user?.dateOfBirth
                ? user.dateOfBirth.split("T")[0]
                : "",
            city: user?.city || ""
        });

        setMessage("");
        setError("");
        setEditing(false);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {

            const response =
                await updateProfile(
                    accessToken,
                    formData
                );

            const updatedUser =
                response.user || response.data;

            setMessage(response.message);

            setUser((currentUser) => ({
                ...currentUser,
                ...updatedUser
            }));
              updateUser(updatedUser);
            setFormData({
                name: updatedUser.name || "",
                phone: updatedUser.phone || "",
                gender: updatedUser.gender || "",
                dateOfBirth: updatedUser.dateOfBirth
                    ? updatedUser.dateOfBirth.split("T")[0]
                    : "",
                city: updatedUser.city || ""
            });

            setEditing(false);

        } catch (error) {

            setError(error.message);

        } finally {

            setSaving(false);

        }
    };


    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    const handleDeleteAccount = async () => {
        setDeleteError("");
        setDeleting(true);

        try {
            await deleteAccount(
                accessToken,
                deletePassword
            );

            await logout();

            navigate("/login");

        } catch (error) {

            setDeleteError(error.message);

        } finally {

            setDeleting(false);

        }
    };


    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }


    if (error && !user) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <p className="error-message">
                        {error}
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="profile-page">

            <div className="profile-card">

                <h1>My Profile</h1>

                <p className="profile-subtitle">
                    Manage your account information
                </p>


                {/* Current Information */}

                {user && (
                    <div className="profile-info">

                        <div className="profile-item">
                            <span>👤 Name</span>
                            <strong>
                                {user.name}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>📧 Email</span>
                            <strong>
                                {user.email}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>📨 Email Verification</span>

                            <strong>
                                {user.emailVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>📱 Phone Number</span>
                            <strong>
                                {user.phone || "Not added"}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>⚧️ Gender</span>
                            <strong>
                                {user.gender || "Not added"}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>🎂 Date of Birth</span>
                            <strong>
                                {user.dateOfBirth
                                    ? new Date(
                                        user.dateOfBirth
                                    ).toLocaleDateString()
                                    : "Not added"}
                            </strong>
                        </div>

                        <div className="profile-item">
                            <span>📍 City</span>
                            <strong>
                                {user.city || "Not added"}
                            </strong>
                        </div>


                    </div>
                )}


                <hr />


                {/* Edit Profile */}

                {!editing ? (

                    <div className="edit-profile-section">


                        <button
                            type="button"
                            className="primary-button"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>

                    </div>

                ) : (

                    <div className="edit-profile-section">

                        <h2>
                            Edit Profile
                        </h2>

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
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter 10-digit phone number"
                            />


                            <div className="input-group">

                                <label htmlFor="gender">
                                    Gender
                                </label>

                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                    <option value="Prefer not to say">
                                        Prefer not to say
                                    </option>
                                </select>

                            </div>


                            <div className="input-group">

                                <label htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>

                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />

                            </div>


                            <Input
                                label="City"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                            />


                            <div className="edit-buttons">

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "💾 Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* Messages */}

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                {/* Account Actions */}

                <div className="profile-actions">

                    <button
                        className="secondary-button"
                        onClick={() =>
                            navigate("/change-password")
                        }
                    >
                        🔐 Change Password
                    </button>

                    <button
                        className="danger-button"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                    <button
                        className="danger-button"
                        onClick={() => {
                            setDeleteStep(1);
                            setDeleteError("");
                            setDeletePassword("");
                            setShowDeleteConfirm(true);
                        }}
                    >
                        🗑️ Delete Account
                    </button>

                    {showDeleteConfirm && (
                        <div
                            className="delete-modal-overlay"
                            onClick={() => {
                                if (!deleting) {
                                    setShowDeleteConfirm(false);
                                    setDeletePassword("");
                                    setDeleteError("");
                                }
                            }}
                        >

                            <div
                                className="delete-modal"
                                onClick={(e) => e.stopPropagation()}
                            >

                                {deleteStep === 1 ? (

                                    <>
                                        <div className="delete-modal-icon">
                                            ⚠️
                                        </div>

                                        <h2>
                                            Delete Account?
                                        </h2>

                                        <p>
                                            Are you sure you want to delete
                                            your account?
                                        </p>

                                        <p className="delete-warning">
                                            This action cannot be undone.
                                            Your account and all profile
                                            information will be permanently
                                            deleted.
                                        </p>

                                        <div className="delete-modal-buttons">

                                            <button
                                                type="button"
                                                className="secondary-button"
                                                onClick={() => {
                                                    setShowDeleteConfirm(false);
                                                    setDeleteError("");
                                                }}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                className="danger-button"
                                                onClick={() => {
                                                    setDeleteStep(2);
                                                    setDeleteError("");
                                                }}
                                            >
                                                Continue
                                            </button>

                                        </div>
                                    </>

                                ) : (

                                    <>
                                        <div className="delete-modal-icon">
                                            🔐
                                        </div>

                                        <h2>
                                            Confirm Deletion
                                        </h2>

                                        <p>
                                            Enter your current password
                                            to permanently delete your account.
                                        </p>

                                        <Input
                                            label="Current Password"
                                            type="password"
                                            value={deletePassword}
                                            onChange={(e) =>
                                                setDeletePassword(e.target.value)
                                            }
                                            placeholder="Enter your current password"
                                        />

                                        {deleteError && (
                                            <p className="error-message">
                                                ❌ {deleteError}
                                            </p>
                                        )}

                                        <div className="delete-modal-buttons">

                                            <button
                                                type="button"
                                                className="secondary-button"
                                                onClick={() => {
                                                    setDeleteStep(1);
                                                    setDeletePassword("");
                                                    setDeleteError("");
                                                }}
                                                disabled={deleting}
                                            >
                                                Back
                                            </button>

                                            <button
                                                type="button"
                                                className="danger-button"
                                                onClick={handleDeleteAccount}
                                                disabled={
                                                    deleting ||
                                                    !deletePassword
                                                }
                                            >
                                                {deleting
                                                    ? "Deleting..."
                                                    : "🗑️ Delete Account"}
                                            </button>

                                        </div>
                                    </>

                                )}

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;