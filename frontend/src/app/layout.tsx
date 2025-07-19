import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ResponsiveAppBar from "./_components/Header";
import Footer from "./_components/Footer";

import "@/app/styles/globals.css";
import React from "react";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s/ Seat Stream",
    default: "Welcome to seat stream",
  },
  description:
    "Seat Stream - Your premier destination for movie ticket booking and cinema seat reservations. Streamline your movie-going experience with easy seat selection, real-time availability, and seamless booking for the latest blockbusters and classic films.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${roboto.variable} flex flex-col w-full p-0 m-0`}
      >
        <AppRouterCacheProvider>
          <ResponsiveAppBar />

          <main className="flex flex-col min-h-100 w-full">
            {children}
            <ToastContainer
              position={"top-right"}
              theme={"dark"}
              autoClose={3000}
              hideProgressBar={false}
            />
          </main>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
