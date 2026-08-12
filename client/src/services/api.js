const API_URL = "http://localhost:5000/api";

const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    const data = await response.json();

   if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");

    error.errors = data.errors || [];

    throw error;
}
    return data;
};

export default apiRequest;