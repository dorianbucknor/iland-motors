import { AssignmentOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { auth } from "../../../user/index";
import { useAppState } from "../../../StateProvider";
import useLocalStorage from "../../../useLocalStorage";
import logo from "../../../media/pictures/ILand-Motors-Logo.png";

function Header() {
	const { appState } = useAppState();
	const [state, dispatch] = appState;
	const [user, setUser] = useLocalStorage("user", {});
	const [trailer, setTrailer] = useLocalStorage("trailer", []);

	const history = useHistory();

	return (
		<div className="header">
			<div className="header__content">
				<div className="header__logo">
					<Link className="logo-name__link" to="/home">
						{/* <h1>ILand Motors</h1> */}
						<img id="logo" src={logo} alt="ILand Motors Logo" />
					</Link>
				</div>
				<div className="header__dropDownNav nav__link">
					<h3
						onClick={() => {
							history.push("/store");
						}}
					>
						Vehicles
					</h3>
					<div className="nav__dropDown">
						<Link
							className="nav__link dropDownNav__link"
							to="/go-karts"
						>
							Go-Karts
						</Link>
						<Link
							className="nav__link dropDownNav__link"
							to="/buggies"
						>
							Dune Buggies
						</Link>
						<Link
							className="nav__link dropDownNav__link"
							to="/cross-karts"
						>
							Cross Karts
						</Link>
					</div>
				</div>
				<nav className="header__nav">
					<Link className="nav__link" to="/home">
						Home
					</Link>
					<Link className="nav__link" to="/store">
						Store
					</Link>
					<div
						className="header__dropDownNav "
						onClick={() => {
							// history.push(
							// 	user.auth ? "/my-account" : "/sign-in"
							// );
						}}
					>
						<h3
							className="nav__link"
							onClick={() => {
								history.push("/my-account");
							}}
						>
							Hello,{" "}
							{user.auth?.displayName.split(" ", 3)[0] ||
								"Stranger"}
						</h3>
						<div className="nav__dropDown">
							{user.auth ? (
								<>
									<Link
										className="nav__link dropDownNav__link"
										to="/my-account/orders"
									>
										Orders
									</Link>
									<Link
										className="nav__link dropDownNav__link"
										to="/"
										onClick={async () => {
											try {
												await auth.signOut();
												dispatch({
													type: "EMPTY_BASKET",
												});
												setTrailer([]);
											} catch (error) {
												console.log(error);
											}
										}}
									>
										Sign Out
									</Link>
								</>
							) : (
								<Link
									className="nav__link dropDownNav__link"
									to="/sign-in"
								>
									Sign In
								</Link>
							)}
						</div>
					</div>
					<Link className="nav__link" to="/trailer">
						Trailer
					</Link>
				</nav>
			</div>
		</div>
	);
}

export default Header;
