import { createContext, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {

    // Swap these out later with something else?
    const setUserPrincipal = (data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", data.jwt);
    };
    const clearUserPrincipal = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    };
    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };
    const getJWT = () => {
        return localStorage.getItem("jwt");
    };

    const login = async (email, password) => {
        const response = await axios.post(`${API_BASE_URL}/auth/local`, {
            identifier: email,
            password: password
        });
        console.log("Authenticated successfully!");
        setUserPrincipal(response.data);
        return response.data.user;
    };

    const register = async (username, email, password) => {
        const response = await axios.post(`${API_BASE_URL}/auth/local/signup`, {
            username: username,
            email: email,
            password: password
        });
        console.log("Registered successfully!");
        setUserPrincipal(response.data);
        return response.data.user;
    };

    const logout = async () => {
        clearUserPrincipal();
    };

    return {
        login,
        logout,
        register,
        get user() { return getUser() },
        get jwt() { return getJWT(); }
    };
};

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
};