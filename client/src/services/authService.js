import apiRequest from "./api";

export const register = async (userData) => {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const login = async (credentials) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
};

export const getProfile = async (token) => {
    return apiRequest("/auth/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateProfile = async (token, userData) => {
    return apiRequest("/auth/profile", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
};

export const changePassword = async (
    token,
    oldPassword,
    newPassword
) => {
    return apiRequest("/auth/change-password", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            oldPassword,
            newPassword
        })
    });
};

export const refreshAccessToken = async (refreshToken) => {
    return apiRequest("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({
            refreshToken
        })
    });
};

export const forgotPassword = async (email) => {
    return apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
            email
        })
    });
};

export const resetPassword = async (token, password) => {
    return apiRequest(`/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify({
            password
        })
    });
};

export const logout = async (refreshToken) => {
    return apiRequest("/auth/logout", {
        method: "POST",
        body: JSON.stringify({
            refreshToken
        })
    });
};
export const verifyEmail = async (token) => {
    return apiRequest(`/auth/verify-email/${token}`, {
        method: "GET"
    });
};

export const deleteAccount = async (token, password) => {
    return apiRequest("/auth/delete-account", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            password
        })
    });
};