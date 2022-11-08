import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppState } from "../../../StateProvider";
import useLocalStorage from "../../../useLocalStorage";

function PrivateRoute({ children, ...rest }) {
	const [user, setUser] = useLocalStorage("user", {});
    
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user.auth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/sign-in",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
