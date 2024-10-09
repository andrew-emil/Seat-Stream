import React from "react";

import Appbar from "../components/Appbar";
import Footer from "../components/Footer";

const FoodPage = () => {
	/*get all the rows from the database from (food_drinks) table with joining (food_drinks and food_categories) tables
        to get category name for the food
    */
	return (
		<>
			<Appbar />
			<div className="food-container">
				<hr />
				<div className="categories">
					<span className="food-category">COLD DRINKS</span>
					<span className="food-category">POPCORN</span>
					<span className="food-category">SWEETS</span>
					<span className="food-category">JUICES</span>
					<span className="food-category">HOT DRINKS</span>
					<span className="food-category">HOT FOOD</span>
					<span className="food-category">EXTRAS</span>
				</div>
				<hr />
			</div>
			<Footer />
		</>
	);
};

export default FoodPage;
