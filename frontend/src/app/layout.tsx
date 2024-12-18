import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import {authintcateUser} from "@/utils/authintcateUser"

export const metadata: Metadata = {
	title: "Seat Stream",
	description: "Cinema reservation website",
};



export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userPayload = await authintcateUser()
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="../../public/favicon.ico" />
			</Head>
			<body className="page-container overflow-x-hidden">
				<Header userPayload={userPayload || null}/>
				<ToastContainer
					position="top-center"
					theme="colored"
					autoClose={2000}
				/>
				{children}
				<Footer />
			</body>
		</html>
	);
}
