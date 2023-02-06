import React from "react";
import "./index.css";
import { useAppState } from "../../../StateProvider.jsx";
import { Header, Footer } from "../../sub_components";

function CheckOut() {
	return (
		<div className="checkout">
			<Header />
            <div className="checkout__main">
                
            </div>
			<Footer />
		</div>
	);
}

export default CheckOut;
