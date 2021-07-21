import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
	ComingSoon,
	Home,
	ProductPage,
	SignIn,
	SignUp,
	Search,
	Account,
	CheckOut,
	AddInfo,
	Trailer,
	Store,
} from "./components/pages";
import { auth, database } from "./user";
import { useAppState } from "./StateProvider.jsx";
import "./media/EngineIconPack/flaticon.css";
import useLocalStorage from "./useLocalStorage";
import { PrivateRoute } from "./components/sub_components";

function App() {
	const { appState, loggedIn } = useAppState();
	const [{ basket }, dispatch] = appState;
	const [trailer, setTrailer] = useLocalStorage("trailer", []);
	const [user, setUser] = useLocalStorage("user", {});

	useEffect(() => {
		auth.onAuthStateChanged(async (newUser) => {
			if (newUser) {
				dispatch({
					type: "SET_USER",
					auth: newUser,
					data: null,
				});
				try {
					let doc = await database
						.collection("users")
						.doc(newUser.uid)
						.get();
					if (doc.exists) {
						setUser({ auth: newUser, data: doc.data() });
					}
				} catch (error) {
					console.log(error);
				}
				loggedIn.setLoggedIn(true);
			} else {
				dispatch({
					type: "SET_USER",
					auth: null,
					data: null,
				});
				setUser({ auth: null, data: null });
				loggedIn.setLoggedIn(false);
			}
		});
	}, []);

	useEffect(() => {
		window.addEventListener("beforeunload", (e) => {
			setTrailer([...basket]);
		});
		window.addEventListener("load", () => {
			if (basket.length <= 0 && trailer.length > 0) {
				trailer.forEach((item) => {
					dispatch({
						type: "ADD_TO_BASKET",
						item,
					});
				});
			}
		});
		return () => {};
	}, [basket, trailer]);

	useEffect(() => {
		if (user.auth) {
			loggedIn.setLoggedIn(true);
		}
		return () => {};
	}, [loggedIn, user]);

	return (
		<div className="App">
			<Router forceRefresh={false}>
				<Switch>
					<Route path="/search">
						<Search />
					</Route>
					<Route path="/store">
						<Store />
					</Route>
					<PrivateRoute
						path="/my-account"
						isLoggedIn={loggedIn.isLoggedIn}
					>
						<Account />
					</PrivateRoute>
					<Route path="/vehicle/:product">
						<ProductPage />
					</Route>
					<Route path="/checkout">
						<CheckOut />
					</Route>
					<Route path="/trailer">
						<Trailer />
					</Route>
					<PrivateRoute
						path="/add-info"
						isLoggedIn={loggedIn.isLoggedIn}
					>
						<AddInfo />
					</PrivateRoute>
					<Route exact path="/sign-in">
						<SignIn />
					</Route>
					<Route exact path="/sign-up">
						<SignUp />
					</Route>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route path="/">
						<ComingSoon />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
