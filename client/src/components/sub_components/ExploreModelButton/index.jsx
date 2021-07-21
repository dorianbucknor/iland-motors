import React from "react";
import "./index.css";

function ExploreModelButton({ children, text }) {
	return (
		<div className="expModBtn">
			<h1 className="expModBtn__text">{text}</h1>
			<i className="fas fa-arrow-right expModBtn__arrow-icon"></i>
		</div>
	);
}

export default ExploreModelButton;
