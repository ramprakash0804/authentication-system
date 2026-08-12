import { Link } from "react-router-dom";
import ramPrakashPhoto from "../assets/ram-prakash.jpg";

function About() {

    return (
        <div className="about-page">

            {/* About Project */}

            <section className="about-hero">

                <div className="about-badge">
                    🔐 Authentication Platform
                </div>

                <h1>
                    About Auth System
                </h1>

                <p>
                    A modern full-stack authentication system
                    designed to provide secure, reliable and
                    convenient account management.
                </p>

            </section>


            {/* Features */}

            <section className="about-section">

                <h2>
                    ✨ What Auth System Offers
                </h2>

                <p className="about-section-description">
                    The project provides the essential features
                    required for a secure user authentication
                    platform.
                </p>


                <div className="about-features">

                    <div className="about-feature-card">
                        <span>📝</span>
                        <h3>User Registration</h3>
                        <p>
                            Create a secure account with
                            validated credentials.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <span>🔑</span>
                        <h3>Secure Login</h3>
                        <p>
                            Secure authentication using
                            access and refresh tokens.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <span>📧</span>
                        <h3>Email Verification</h3>
                        <p>
                            Verify your email address before
                            using protected account features.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <span>🔄</span>
                        <h3>Password Recovery</h3>
                        <p>
                            Forgot your password? Recover
                            your account securely.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <span>👤</span>
                        <h3>Profile Management</h3>
                        <p>
                            Manage your personal information
                            from your profile.
                        </p>
                    </div>


                    <div className="about-feature-card">
                        <span>🛡️</span>
                        <h3>Account Security</h3>
                        <p>
                            Protected routes and secure
                            password management.
                        </p>
                    </div>

                </div>

            </section>


            {/* Technology */}

            <section className="about-tech">

                <h2>
                    🛠️ Built With
                </h2>

                <div className="tech-list">

                    <span>React</span>
                    <span>JavaScript</span>
                    <span>Node.js</span>
                    <span>Express.js</span>
                    <span>MongoDB</span>
                    <span>JWT</span>
                    <span>CSS</span>

                </div>

            </section>


            {/* Developer */}

            <section className="developer-section">

                <div className="developer-card">

                    <div className="developer-photo-wrapper">

                        <img
                            src={ramPrakashPhoto}
                            alt="Ram Prakash"
                            className="developer-photo"
                        />

                    </div>


                    <div className="developer-info">

                        <div className="developer-badge">
                            👨‍💻 Developer
                        </div>

                        <h2>
                            Abhi Ramprakash
                        </h2>

                        <h3>
                            B.Tech CSE Student & Developer
                        </h3>

                        <p>
                            I'm Ram Prakash, a Computer Science
                            Engineering student interested in
                            software development and technology.
                        </p>

                        <p>
                            I enjoy building practical projects,
                            exploring full-stack development,
                            learning cybersecurity and turning
                            ideas into working applications.
                        </p>


                        <div className="developer-links">

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Footer */}

            <section className="about-footer">

                <h2>
                    Built with ❤️ and curiosity.
                </h2>

                <p>
                    Auth System is a project focused on
                    learning, building and improving modern
                    web development skills.
                </p>

                <Link
                    to="/register"
                    className="primary-button about-button"
                >
                    🚀 Create an Account
                </Link>

            </section>

        </div>
    );
}

export default About;