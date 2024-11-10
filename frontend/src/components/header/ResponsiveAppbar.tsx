import { motion } from "framer-motion";
import { useState } from "react";
import {
	FiChevronDown,
	FiHome,
	FiFilm,
	FiCoffee,
	FiLogIn,
	FiUserPlus,
	FiUser,
	FiSearch,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import AppbarOption from "./AppbarOption";
import Link from "next/link";

import "./responsiveAppbar.css";



const ResponsiveAppbar = ({ userPayload }: UseAuthProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	const handleMenuItemClick = () => setIsMenuOpen(false);

	const handleSubmit = () => {
		console.log(searchTerm);
		setIsMenuOpen(false);
	};

	const menuIconVariants = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	};

	const menuVariants = {
		open: {
			scaleY: 1,
			opacity: 1,
			transition: { duration: 0.3, staggerChildren: 0.1 },
		},
		closed: { scaleY: 0, opacity: 0, transition: { duration: 0.3 } },
	};

	const itemVariants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -10 },
	};

	return (
		<div>
			<motion.div animate={isMenuOpen ? "open" : "closed"} className="relative">
				<button
					onClick={toggleMenu}
					aria-expanded={isMenuOpen}
					aria-label="Toggle menu"
					className="menu-btn flex items-center">
					<span>Menu</span>
					<motion.span
						variants={menuIconVariants}
						animate={isMenuOpen ? "open" : "closed"}
						className="ml-1">
						<FiChevronDown />
					</motion.span>
				</button>

				<motion.ul
					initial="closed"
					animate={isMenuOpen ? "open" : "closed"}
					variants={menuVariants}
					className="list-item">
					{userPayload && (
						<motion.li
							variants={itemVariants}
							className="flex items-center gap-2 p-2 text-nowrap w-full cursor-pointer border-[6px] border-solid">
							<Link
								href="/profile"
								onClick={handleMenuItemClick}
								className="flex items-center gap-2 text-blue-700 font-bold transition w-full">
								<FiUser className="icon" />
								<span>{userPayload.username}</span>
							</Link>
						</motion.li>
					)}
					<AppbarOption
						Icon={FiHome}
						text="Home"
						url="/"
						onClick={handleMenuItemClick}
					/>
					{userPayload?.isAdmin === true && (
						<AppbarOption
							Icon={MdOutlineAdminPanelSettings}
							text="Admin Dashboard"
							url="/admin"
							onClick={handleMenuItemClick}
						/>
					)}
					<AppbarOption
						Icon={FiFilm}
						text="What's on"
						url="/movies/what's-on"
						onClick={handleMenuItemClick}
					/>
					<AppbarOption
						Icon={FiFilm}
						text="Coming soon"
						url="/movies/coming-soon"
						onClick={handleMenuItemClick}
					/>
					<AppbarOption
						Icon={FiCoffee}
						text="Food & Drinks"
						url="/food&drinks"
						onClick={handleMenuItemClick}
					/>
					{userPayload === null && (
						<>
							<AppbarOption
								Icon={FiLogIn}
								text="Login"
								url="/login"
								onClick={handleMenuItemClick}
							/>
							<AppbarOption
								Icon={FiUserPlus}
								text="Register"
								url="/register"
								onClick={handleMenuItemClick}
							/>
						</>
					)}

					<motion.li
						variants={itemVariants}
						className="flex items-center space-x-2">
						<input
							type="text"
							placeholder="Search For a Movie..."
							className="flex mt-1 p-1 rounded bg-gray-800 text-white w-full"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							onClick={handleSubmit}
							aria-label="Search"
							className="search-btn hover:text[#2196f3]">
							<FiSearch size={18} color="white" />
						</button>
					</motion.li>
				</motion.ul>
			</motion.div>
		</div>
	);
};

export default ResponsiveAppbar;
