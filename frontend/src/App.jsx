import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ReservationPage from "./pages/ReservationPage";
import FoodPage from "./pages/FoodPage";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import MoviesPage from "./pages/MoviesPage";

import "./css/app.css";

const queryClient = new QueryClient();

const App = () => {
	return (
		<div className="page-container">
			<Appbar />
			<div className="content-wrapper">
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<QueryClientProvider client={queryClient}>
									<HomePage />
								</QueryClientProvider>
							}
						/>
						<Route path="/home" element={<HomePage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/movieDetail"
							element={
								<QueryClientProvider client={queryClient}>
									<MovieDetailPage />
								</QueryClientProvider>
							}
						/>
						<Route path="/reservation" element={<ReservationPage />} />
						<Route path="/food" element={<FoodPage />} />
						<Route
							path="/movies/whatson"
							element={
								<QueryClientProvider client={queryClient}>
									<MoviesPage pageTitle={"what's on"} />
								</QueryClientProvider>
							}
						/>
						<Route
							path="/movies/comingsoon"
							element={
								<QueryClientProvider client={queryClient}>
									<MoviesPage pageTitle={"coming soon"} />
								</QueryClientProvider>
							}
						/>

						<Route
							path="*"
							element={
								<div>
									<h1>404 Not Found :(</h1>
								</div>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
			<Footer />
		</div>
	);
};

export default App;
