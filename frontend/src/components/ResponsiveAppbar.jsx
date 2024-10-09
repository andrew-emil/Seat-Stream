import React, { useState } from "react";
import {
	FiChevronDown,
	FiHome,
	FiFilm,
	FiCoffee,
	FiLogIn,
	FiSearch,
	// FiShoppingCart,
	FiUserPlus,
} from "react-icons/fi";
import { motion } from "framer-motion";

import "../css/components/responiveAppbar.css";

const wrapperVariant = {
	open: {
		scaleY: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.2,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
};

const iconVariant = {
	open: { rotate: 180 },
	close: { rotate: 0 },
};

const itemVariant = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
		},
	},
	closed: {
		opacity: 0,
		y: -15,
		transition: {
			when: "afterChildren",
		},
	},
};

const actionIconVariant = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 },
};

const ResponsiveAppbar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(searchTerm);
	};

	return (
		<div>
			<motion.div animate={isMenuOpen ? "open" : "close"} className="relative">
				<button
					onClick={() => setIsMenuOpen((perv) => !perv)}
					className="menu-btn">
					<span>Menu</span>
					<motion.span variants={iconVariant}>
						<FiChevronDown />
					</motion.span>
				</button>

				<motion.ul
					initial={wrapperVariant.closed}
					variants={wrapperVariant}
					style={{
						originY: "top",
						translateX: "-50%",
					}}
					className="list-item">
					<Option icon={FiHome} text="Home" url="/" />
					<Option icon={FiFilm} text="What's on" url="/movies/whatson" />
					<Option icon={FiFilm} text="Coming soon" url="/movies/comingsoon" />
					<Option icon={FiCoffee} text="Food & Drinks" url="/food" />
					<Option icon={FiLogIn} text="Login" url="/login" />
					<Option icon={FiUserPlus} text="Register" url="/signup" />
					<motion.li variants={itemVariant} className="search">
						<input
							type="text"
							placeholder="Search For a Movie..."
							className="search-input"
							value={searchTerm}
							onChange={handleChange}
						/>
						<FiSearch onClick={handleSubmit} className="search-btn" />
					</motion.li>
				</motion.ul>
			</motion.div>
		</div>
	);
};

const Option = ({ text, icon: Icon, url }) => {
	return (
		<motion.li variants={itemVariant} className="item">
			<a href={url}>
				<motion.span variants={actionIconVariant} className="icon">
					<Icon />
				</motion.span>
				<span>{text}</span>
			</a>
		</motion.li>
	);
};

export default ResponsiveAppbar;
