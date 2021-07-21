import { AssignmentOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { auth } from "../../../user/index";
import { useAppState } from "../../../StateProvider";
import useLocalStorage from "../../../useLocalStorage";

function Header() {
	const { appState } = useAppState();
	const [{ user, basket }, dispatch] = appState;
	const [trailer, setTrailer] = useLocalStorage("trailer", []);

	const history = useHistory();

	const arraysMatch = function (arr1, arr2) {
		if (arr1.length !== arr2.length) return false;

		for (var i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	};

	return (
		<div className="header">
			<div className="header__content">
				<div className="header__logo">
					<Link className="logo-name__link" to="/home">
						{/* <h1>ILand Motors</h1> */}
						ILand Motors
					</Link>
				</div>
				<div className="header__dropDownNav nav__link">
					<h3>Vehicles</h3>
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
						className="header__dropDownNav nav__link"
						onClick={() => {
							// history.push(
							// 	user.auth ? "/my-account" : "/sign-in"
							// );
						}}
					>
						<h3>
							Hello,{" "}
							{user.auth?.displayName.split(" ", 3)[0] ||
								"Stranger"}
						</h3>
						<div className="nav__dropDown">
							{user.auth ? (
								<>
									<Link
										className="nav__link dropDownNav__link"
										to="/orders"
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
