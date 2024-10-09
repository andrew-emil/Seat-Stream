import React from "react";

import "../css/components/loading.css"

const Loading = () => {
	return (
		<div className="loader-container">
			<div className="loader">
				<div className="loader__filmstrip"></div>
				<p className="loader__text">loading</p>
			</div>
		</div>
	);
};

export default Loading;
