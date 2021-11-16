import { useAuth } from "../services/useAuth";
import { Outlet, Navigate } from "react-router";

export default function PrivateRoute() {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};