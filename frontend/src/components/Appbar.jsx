import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";

import useMediaQuery from "@mui/material/useMediaQuery";
import ResponsiveAppbar from "./ResponsiveAppbar";
import logo from "../assets/logo.jpg";

import "../css/components/appbar.css";

const Appbar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMaxWidth = useMediaQuery("(max-width: 1030px)");

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(searchTerm);
	};

	const onMouseHover = () => setIsMenuOpen(true);

	const onMouseLeave = () => setIsMenuOpen(false);

	return (
		<nav>
			<div className="container-fluid">
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				{isMaxWidth && (
					<div className="responsive-appbar-container">
						<ResponsiveAppbar />
					</div>
				)}
				{!isMaxWidth && (
					<div className="links">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="/">
									Home
								</a>
							</li>
							<li
								className="nav-item movie"
								onMouseEnter={onMouseHover}
								onMouseLeave={onMouseLeave}>
								<a className="nav-link active" aria-current="page" href="/">
									Movies
									<FaCaretDown />
								</a>
								<ul
									className="movies-options"
									style={{ opacity: isMenuOpen ? 1 : 0 }}>
									<li>
										<a href="/movies/whatson">What's on</a>
									</li>
									<hr />
									<li>
										<a href="/movies/comingsoon">Coming soon</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/food">
									Food & Drinks
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/login">
									Login
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/signup">
									Register
								</a>
							</li>
						</ul>
						<form className="form-control" onSubmit={handleSubmit}>
							<div className="searchbar">
								<input
									type="text"
									placeholder="Search for a movie..."
									className="search"
									onChange={handleChange}
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

export default React.memo(Appbar);
