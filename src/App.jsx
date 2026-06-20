import { RouterProvider } from "react-router-dom";
import "@/App.css";

import router from "@/routes/router";
import ThemeProvider from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <div className="app-page">
                    <RouterProvider router={router} />
                    <Toaster position="top-center" />
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
