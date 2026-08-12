import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const profileLetter =
        user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    const handleLogout = async () => {
        try {
            await logout();
            setMenuOpen(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="navbar">

            <div className="navbar-container">

                <Link
                    to="/dashboard"
                    className="navbar-logo"
                >
                    Authentication System
                </Link>

                <Link
                    to="/about"
                    className="navbar-about-link"
                >
                    About
                </Link>

                {user && (
                    <div className="profile-menu">

                        <button
                            className="profile-icon-button"
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                            aria-label="Profile menu"
                        >
                            {profileLetter}
                        </button>

                        {menuOpen && (
                            <div className="profile-dropdown">

                                <Link
                                    to="/dashboard"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                >
                                    🏠 Dashboard
                                </Link>

                                <Link
                                    to="/profile"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                >
                                    👤 Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                >
                                    🚪 Logout
                                </button>

                            </div>
                        )}

                    </div>
                )}

            </div>

        </header>
    );
}

export default Navbar;