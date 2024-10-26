import type { Metadata } from "next";
import AdminSideBar from "./AdminSideBar";

import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: " Admin dashboard for Cinema reservation website",
};

interface AdminDashboardProps {
	children: React.ReactNode;
}

export default function adminLayout({ children }: AdminDashboardProps) {
	return (
		<div className="flex items-start justify-between overflow-hidden">
			<AdminSideBar />
			<div className="w-full lg:w-4/5">{children}</div>
		</div>
	);
}
