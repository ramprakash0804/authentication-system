import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../services/authService";

function VerifyEmail() {
    const { token } = useParams();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const verificationStarted = useRef(false);

    useEffect(() => {

        // Prevent duplicate verification requests
        if (verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        const verify = async () => {

            try {

                const response =
                    await verifyEmail(token);

                setMessage(response.message);
                setError("");

            } catch (error) {

                setError(error.message);
                setMessage("");

            } finally {

                setLoading(false);

            }
        };

        verify();

    }, [token]);

    return (
        <div className="auth-page">

            <div className="auth-card verify-card">

                {loading && (
                    <>
                        <div className="verify-icon">
                            ⏳
                        </div>

                        <h1>Verifying Email</h1>

                        <p className="auth-subtitle">
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {!loading && message && (
                    <>
                        <div className="verify-icon">
                            ✅
                        </div>

                        <h1>Email Verified!</h1>

                        <p className="success-message">
                            {message}
                        </p>

                        <p className="auth-subtitle">
                            Your email has been successfully verified.
                        </p>

                        <Link
                            to="/login"
                            className="verify-button"
                        >
                            Continue to Login
                        </Link>
                    </>
                )}

                {!loading && error && (
                    <>
                        <div className="verify-icon">
                            ❌
                        </div>

                        <h1>Verification Failed</h1>

                        <p className="error-message">
                            {error}
                        </p>

                        <Link
                            to="/login"
                            className="verify-button"
                        >
                            Back to Login
                        </Link>
                    </>
                )}

            </div>

        </div>
    );
}

export default VerifyEmail;