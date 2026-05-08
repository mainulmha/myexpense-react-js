import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

    const isLoggedIn = false;
    if (!isLoggedIn) return <Navigate to="/login" />

    return children;
}
