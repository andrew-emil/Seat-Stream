import Carousel from "@/components/Carousel";
import Loading from "./loading"

import "./home.css";

const HomePage = () => {
	new Promise((resolve) => setTimeout(resolve, 5000));

	return (
		<main className="home-page-container">
			<>
				<div className="first-section">
					{/* <Carousel movie={data[0]} /> */}
          <Loading />
				</div>
				<br />
				<div className="second-section">
					<div className="section-title">
						<span>What's on</span>
					</div>
					<br />
				</div>
			</>
		</main>
	);
};

export default HomePage;
