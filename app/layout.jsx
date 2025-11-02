import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";
import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "PropertyLynk | Find  the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en" className={`${leagueSpartan.variable}`}>
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
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
        </body>
      </html>
    </AuthProvider>
  );
};

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700", "600"],
  variable: "--font-brand",
});

export default MainLayout;
