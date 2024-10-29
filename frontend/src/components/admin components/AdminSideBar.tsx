"use client";
import Option from "@/components/admin components/Option";
import Link from "next/link";
import { useState } from "react";

const AdminSideBar = () => {
	const [moviesMenuOpen, setMoviesMenuOpen] = useState(false);
	const [foodMenuOpen, setFoodMenuOpen] = useState(false);

	return (
		<div className="w-full bg-[#3e3a3a] font-semibold text-xl border-t border-[#8b858d] h-19 p-5 flex flex-row items-start justify-between lg:justify-center">
			<Link
				href="/admin"
				className="text-lg lg:text-2xl font-bold text-[#e91e63] transition cursor-pointer">
				<h3>Dashboard</h3>
			</Link>
			<div className="flex flex-row space-x-8 justify-evenly items-center flex-grow">
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
					btnText="Manage Food Menu"
					LinksText={["Add Food Item", "Food Table"]}
					url={["/admin/add-food", "/admin/food-table"]}
				/>
			</div>
		</div>
	);
};

export default AdminSideBar;
