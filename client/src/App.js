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
	const { appState } = useAppState();
	const [{ basket, user }, dispatch] = appState;
	const [trailer, setTrailer] = useLocalStorage("trailer", []);
	const [loggedInUser, setUser] = useLocalStorage("user", {});

	useEffect(() => {
		auth.onAuthStateChanged(async (newUser) => {
			if (newUser) {
				try {
					let doc = await database
						.collection("users")
						.doc(newUser.uid)
						.get();
					if (doc.exists) {
						setUser({ auth: newUser, data: doc.data() });
						dispatch({
							type: "SET_USER",
							auth: newUser,
							data: doc.data(),
						});
						doc.data().trailer?.forEach((item) => {
							dispatch({
								type: "ADD_TO_BASKET",
								item,
							});
						});
                        setTrailer(doc.data().trailer);
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				dispatch({
					type: "SET_USER",
					auth: null,
					data: null,
				});
				setUser({ auth: null, data: null });
			}
		});
	}, []);

	useEffect(() => {
		// window.addEventListener("beforeunload", (e) => {
		// 	setTrailer([...basket]);
		// });
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
					<PrivateRoute path="/my-account/:tab">
						<Account />
					</PrivateRoute>
					<Route path="/kart/:model?">
						<ProductPage />
					</Route>
					<Route path="/buggy/:model?">
						<ProductPage />
					</Route>
					<Route path="/checkout">
						<CheckOut />
					</Route>
					<Route path="/trailer">
						<Trailer />
					</Route>
					<PrivateRoute path="/add-info">
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
