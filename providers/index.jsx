import AuthProvider from "@/components/AuthProvider";

import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1f2937",
            color: "#fff",
            fontSize: "14px",
            marginTop: "4rem",
          },
          className: "relative overflow-hidden",

          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  );
};
export default Providers;
