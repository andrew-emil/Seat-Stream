"use client";
import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import ResponsiveAppbar from "./ResponsiveAppbar";
import { authintcateUser } from "@/hooks/useAuth";
import {UseAuthProps} from "@/utils/types"
import {
	FiUser,
} from "react-icons/fi";

import "./header.css";

const Header =  ({ userPayload }: UseAuthProps) => {
	

	const [searchTerm, setSearchTerm] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMaxWidth = useMediaQuery({ query: "(max-width: 1080px)" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(searchTerm);
		setSearchTerm("");
	};

	const onMouseHover = () => setIsMenuOpen(true);

	const onMouseLeave = () => setIsMenuOpen(false);
	console.log(userPayload);
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
						<ResponsiveAppbar userPayload={userPayload || null} />
					</div>
				)}
				{!isMaxWidth && (
					<div className="links flex flex-row justify-center align-center m-auto">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link active text-lg"
									aria-current="page"
									href="/">
									Home
								</Link>
							</li>
							<li
								className="nav-item movie"
								onMouseEnter={onMouseHover}
								onMouseLeave={onMouseLeave}>
								<div className="nav-link active text-lg" aria-current="page">
									<div className="h-auto w-auto flex flex-row justify-center align-center ">
										Movies
										<FaCaretDown className="relative top-[5px]" />
									</div>
								</div>
								<ul
									className="movies-options"
									style={{ display: isMenuOpen ? "flex" : "none" }}>
									<li className="text-sm">
										<Link href="/movies/what's-on">What's on</Link>
									</li>
									<hr className="w-full" />
									<li className="text-sm">
										<Link href="/movies/coming-soon">Coming soon</Link>
									</li>
								</ul>
							</li>
							<li className="nav-item text-lg">
								<Link className="nav-link" href="/food&drinks">
									Food & Drinks
								</Link>
							</li>
							{userPayload === null && (
								<>
									<li className="nav-item text-lg">
										<Link className="nav-link" href="/login">
											Login
										</Link>
									</li>
									<li className="nav-item text-lg">
										<Link className="nav-link" href="/register">
											Register
										</Link>
									</li>
								</>
							)}
							{userPayload?.isAdmin === true && (
								<li className="nav-item text-lg">
									<Link className="nav-link" href="/admin">
										Admin Dashboard
									</Link>
								</li>
							)}
							{userPayload && (
								<li className="ml-4 list-none relative bottom-[4px]">
									<Link
										className="text-lg text-blue-800 font-bold p-1 rounded-lg transition-colors duration-300 hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-hover flex flex-row items-center gap-1"
										href="/profile">
										< FiUser/>
										{userPayload.username}
									</Link>
								</li>
							)}
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