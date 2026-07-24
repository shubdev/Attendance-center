import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../features/theme/ThemeContext.jsx";
import { useEffect } from "react";
import { useGetUserQuery } from "../features/auth/api/auth.api.js"
import useAuth from "../features/auth/hooks/useAuth.js";
import { useSocketListeners } from "../features/socket/useSocketListeners.js";

function App() {

    const { data } = useGetUserQuery();
    const { handleSetUser } = useAuth();

    // Initialize real-time Socket.IO listeners & auto cache sync
    useSocketListeners();

    useEffect(() => {
        if (data) {
            handleSetUser(data.data);
        } else {
            handleSetUser(null);
        }
    }, [data]);

    return (
        <ThemeProvider>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <Outlet />
        </ThemeProvider>
    );
}

export default App;
