"use client";
import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

import "./header.css";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMaxWidth = useMediaQuery({ query: "(max-width: 1030px)" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(searchTerm);
		setSearchTerm("");
	};

	const onMouseHover = () => setIsMenuOpen(true);

	const onMouseLeave = () => setIsMenuOpen(false);

	return (
		<nav>
			<div className="container-fluid">
				<div className="h-auto w-auto">
					<Link href="/" className="logo">
						Seat
						<MdLocalMovies />
						Stream
					</Link>
				</div>
				{isMaxWidth && (
					<div className="responsive-appbar-container">
						{/* <ResponsiveAppbar /> */}
					</div>
				)}
				{!isMaxWidth && (
					<div className="links flex flex-row justify-center align-center m-auto">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" href="/">
									Home
								</Link>
							</li>
							<li
								className="nav-item movie"
								onMouseEnter={onMouseHover}
								onMouseLeave={onMouseLeave}>
								<div className="nav-link active" aria-current="page">
									<div className="h-auto w-auto flex flex-row justify-center align-center">
										Movies
										<FaCaretDown className="relative top-[5px]" />
									</div>
								</div>
								<ul
									className="movies-options"
									style={{ opacity: isMenuOpen ? 1 : 0 }}>
									<li>
										<Link href="/whatson">What's on</Link>
									</li>
									<hr className="w-full" />
									<li>
										<Link href="/comingsoon">Coming soon</Link>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/food&drinks">
									Food & Drinks
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/login">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/register">
									Register
								</Link>
							</li>
						</ul>
						<form className="form-control" onSubmit={handleSubmit}>
							<div className="searchbar">
								<input
									type="text"
									placeholder="Search for a movie..."
									className="search"
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<button type="submit">
									<FaSearch size={20} />
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Header;
