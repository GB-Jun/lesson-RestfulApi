import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthContextProvider({ children }) {
    const localAuthStr = localStorage.getItem("auth");
    const unAuthState = {
        authorized: false,
        sid: 0,
        account: "",
        token: "",
    };

    let localAuth = { ...unAuthState };
    if (localAuthStr) {
        try {
            localAuth = JSON.parse(localAuthStr);
            if (localAuth.account && localAuth.token) {
                localAuth = { ...localAuth, authorized: true };
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    const [auth, setAuth] = useState(localAuth);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("auth");
        setAuth(unAuthState);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
