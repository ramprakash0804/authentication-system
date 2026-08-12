import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            <section className="home-hero">

                <div className="home-badge">
                    🔐 Secure Authentication Platform
                </div>

                <h1>
                    Welcome to Auth System
                </h1>

                <p>
                    A modern and secure authentication platform
                    for managing your account, profile and
                    security with ease.
                </p>

                <div className="home-actions">

                    <Link
                        to="/register"
                        className="primary-button home-button"
                    >
                        🚀 Sign Up
                    </Link>

                    <Link
                        to="/login"
                        className="secondary-button home-button"
                    >
                        🔐 Sign In
                    </Link>

                </div>

                <p className="home-signup-text">
                    Want to know more about the project?{" "}
                    <Link to="/about">
                        Learn About Auth System →
                    </Link>
                </p>

            </section>


            <section className="home-features">

                <div className="home-feature">
                    <span>🛡️</span>
                    <h3>Secure</h3>
                    <p>
                        Your account is protected with
                        modern authentication techniques.
                    </p>
                </div>


                <div className="home-feature">
                    <span>📧</span>
                    <h3>Email Verification</h3>
                    <p>
                        Verify your email and keep your
                        account information secure.
                    </p>
                </div>


                <div className="home-feature">
                    <span>👤</span>
                    <h3>Profile Management</h3>
                    <p>
                        Easily manage your personal
                        account information.
                    </p>
                </div>

            </section>


            <section className="home-bottom">

                <h2>
                    Simple. Secure. Reliable.
                </h2>

                <p>
                    Everything you need for a modern
                    authentication experience.
                </p>

            </section>

        </div>
    );
}

export default Home;