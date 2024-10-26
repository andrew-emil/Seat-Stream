"use client";
import Option from "@/components/admin components/Option";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

const AdminSideBar = () => {
	const [adminDashboard, setAdminDashboard] = useState(
		useMediaQuery({ query: "(max-width: 768px)" }) ? false : true
	);
	const [moviesMenuOpen, setMoviesMenuOpen] = useState(false);
	const [foodMenuOpen, setFoodMenuOpen] = useState(false);

	return (
		<div className="w-15 lg:w-1/5 p-1 lg:p-5 bg-[#5c5757] text-[#7f094b] border-r-1 border-[#b4aab2] h-screen sm:w-1/3">
			<Link
				href="/admin"
				className="flex item-center text-lg lg:text-xl font-semibold">
				<h3 className="text-blue-[600]">Dashboard</h3>
			</Link>
			<Option
				state={moviesMenuOpen}
				setState={setMoviesMenuOpen}
				btnText="Manage Movies"
				LinksText={["Add Movies", "Movies Table"]}
				url={["/admin/add-movies", "/admin/movies-table"]}
			/>

			<Option
				state={foodMenuOpen}
				setState={setFoodMenuOpen}
				btnText="Manage Food menu"
				LinksText={["Add Movies", "Movies Table"]}
				url={["/admin/add-movies", "/admin/movies-table"]}
			/>
		</div>
	);
};

export default AdminSideBar;
