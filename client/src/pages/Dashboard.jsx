import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/authService";

function Dashboard() {
    const { user, accessToken } = useAuth();

    const [dashboardUser, setDashboardUser] = useState(user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshDashboard = async () => {
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await getProfile(accessToken);

                const latestUser =
                    response.user || response.data;

                setDashboardUser(latestUser);
            } catch (error) {
                console.error(
                    "Dashboard profile refresh failed:",
                    error
                );

                // Keep existing user data if API fails
                setDashboardUser(user);
            } finally {
                setLoading(false);
            }
        };

        refreshDashboard();
    }, [accessToken]);

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <h2>Loading Dashboard...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                <div className="dashboard-header">
                    <h1>Dashboard</h1>

                    <p>
                        Welcome back, {dashboardUser?.name} 👋
                    </p>
                </div>


                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            👤
                        </div>

                        <h3>Account</h3>

                        <p>
                            {dashboardUser?.name}
                        </p>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            📧
                        </div>

                        <h3>Email</h3>

                        <p>
                            {dashboardUser?.email}
                        </p>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            📨
                        </div>

                        <h3>Email Verification</h3>

                        <p>
                            {dashboardUser?.emailVerified
                                ? "Verified"
                                : "Not Verified"}
                        </p>
                    </div>


                    <div className="dashboard-card">
                        <div className="dashboard-card-icon">
                            🔐
                        </div>

                        <h3>Security</h3>

                        <p>
                            Account Protected
                        </p>
                    </div>

                </div>


                <div className="dashboard-welcome">

                    <h2>
                        You're successfully logged in 🎉
                    </h2>

                    <p>
                        Your account is active and protected.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;