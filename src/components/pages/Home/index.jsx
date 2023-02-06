import React from "react";
import { Footer, Header, MultiModelViewer } from "../../sub_components";
import "./index.css";

function Home() {
	return (
		<div className="home">
			<Header />
			<div className="home__content">
				<div className="home__modelViewer">
					<MultiModelViewer />
				</div>
			</div>
			<div id="home__footer">
				<Footer />
			</div>
		</div>
	);
}

export default Home;
