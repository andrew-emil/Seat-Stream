import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ResponsiveAppBar from "@/app/_components/Header";
import { ToastContainer } from "react-toastify";
import Footer from "@/app/_components/Footer";

export default function adminLayout({
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
