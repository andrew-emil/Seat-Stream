import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Footer from "@/app/_components/Footer";

export default function guestLayout({
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
          <main className="flex flex-col min-h-100 w-full">{children}</main>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
