import { RouterProvider } from "react-router-dom";
import "@/App.css";

import router from "@/routes/router";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <ThemeProvider>
      <div className="app-page">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
