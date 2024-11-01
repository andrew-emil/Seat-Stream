"use client";
import MenuOption from "@/components/admin components/MenuOption";
import Link from "next/link";
import { useState } from "react";

const AdminSideBar = () => {
	type MenuKey = "movies" | "food" | "theater";
	const [openMenu, setOpenMenu] = useState({
		movies: false,
		food: false,
		theater: false,
	});

	const toggleMenu = (menu: MenuKey) => {
		setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
	};

	return (
		<div className="w-full bg-[#3e3a3a] font-semibold border-t border-[#8b858d] h-19 p-4 flex flex-col lg:flex-row items-start lg:items-center">
			<Link
				href="/admin"
				className="text-xl lg:text-2xl font-bold text-[#e91e63] transition cursor-pointer mb-4 mr-5 lg:mb-0 lg:w-auto">
				<h3>Dashboard</h3>
			</Link>
			<div className="flex flex-col lg:flex-row lg:space-x-8 w-full lg:w-full justify-evenly">
				<MenuOption
					isOpen={openMenu.movies}
					toggle={() => toggleMenu("movies")}
					btnText="Manage Movies"
					links={[
						{ text: "Add Movies", href: "/admin/add-movies" },
						{ text: "Movies Table", href: "/admin/movies-table" },
					]}
				/>
				<MenuOption
					isOpen={openMenu.food}
					toggle={() => toggleMenu("food")}
					btnText="Manage Food Menu"
					links={[
						{ text: "Add Food Item", href: "/admin/add-food" },
						{ text: "Food Table", href: "/admin/food-table" },
						{ text: "Manage category", href: "/admin/category-table" },
					]}
				/>
				<MenuOption
					isOpen={openMenu.theater}
					toggle={() => toggleMenu("theater")}
					btnText="Manage Theaters"
					links={[
						{ text: "Add new Theater", href: "/admin/add-theater" },
						{ text: "Theaters Table", href: "/admin/theater-table" },
					]}
				/>
			</div>
		</div>
	);
};

export default AdminSideBar;
