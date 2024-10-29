import type { Metadata } from "next";
import AdminSideBar from "@/components/admin components/AdminSideBar";

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
		<div className="overflow-x-hidden">
			<AdminSideBar />
			<div className="w-full block">{children}</div>
		</div>
	);
}
