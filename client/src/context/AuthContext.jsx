import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import {
    login as loginAPI,
    refreshAccessToken,
    getProfile,
    logout as logoutAPI
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const [loading, setLoading] = useState(true);


    // LOGIN
    const login = async (credentials) => {

        const response = await loginAPI(credentials);

        setUser(response.data.user);

        setAccessToken(response.data.accessToken);

        setRefreshToken(response.data.refreshToken);

        sessionStorage.setItem(
            "refreshToken",
            response.data.refreshToken
        );

        return response;
    };

    const updateUser = (updatedUser) => {
    setUser((currentUser) => ({
        ...currentUser,
        ...updatedUser
    }));
};


    // RESTORE SESSION
    useEffect(() => {

        const restoreSession = async () => {

            const savedRefreshToken =
                sessionStorage.getItem("refreshToken");

            if (!savedRefreshToken) {

                setLoading(false);

                return;
            }

            try {

                const response =
                    await refreshAccessToken(savedRefreshToken);

                const newAccessToken =
                    response.data.accessToken;

                setAccessToken(newAccessToken);

                setRefreshToken(savedRefreshToken);

               const profileResponse =
    await getProfile(newAccessToken);

console.log("PROFILE RESPONSE:", profileResponse);

setUser(profileResponse.data);
            } catch (error) {

                sessionStorage.removeItem("refreshToken");

                setUser(null);

                setAccessToken(null);

                setRefreshToken(null);

            } finally {

                setLoading(false);

            }
        };

        restoreSession();

    }, []);


    // LOGOUT
   const logout = async () => {

    try {
        const savedRefreshToken =
            sessionStorage.getItem("refreshToken");

        if (savedRefreshToken) {
            await logoutAPI(savedRefreshToken);
        }

    } catch (error) {
        console.error("Logout error:", error);

    } finally {

        sessionStorage.removeItem("refreshToken");

        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    }
};


    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                loading,
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {

    return useContext(AuthContext);

};