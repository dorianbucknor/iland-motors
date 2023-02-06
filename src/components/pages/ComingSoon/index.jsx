import React, { useState } from "react";
import { useHistory } from "react-router";
import "./index.css";

function ComingSoon() {
	const [time, setTime] = useState("");

	// Set the date we're counting down to
	var countDownDate = new Date("Jul 23, 2021 01:00:00").getTime();
	// Update the count down every 1 second
	var x = setInterval(function () {
		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			setTime("EXPIRED");
		}
	}, 1000);

	const history = useHistory();

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: "5em",
				background:
					"linear-gradient(to right, #0000008e, #0000008e), url(/media/pictures/countdown.jpg) no-repeat center center",
				backgroundSize: "cover",
				color: "white",
			}}
		>
			<label
				style={{
					fontSize: "70px",
					color: "white",
					width: "100%",
					textAlign: "center",
					background: `linear-gradient(to right, #87ceff20, #FFFF1944, #87ceff20), no-repeat center center`,
				}}
			>
				Coming Soon
			</label>
			<label
				className="rainbowWrap"
				style={{
					fontSize: "120px",
				}}
				onClick={(e) => {
					history.push("/home");
				}}
			>
				{time}
			</label>
			<br />
			<br />
			<br />
		</div>
	);
}

export default ComingSoon;
