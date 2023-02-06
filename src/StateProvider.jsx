import React, { useContext, useReducer, useState } from "react";

export const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
	const appState = useReducer(reducer, initialState);
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
		<StateContext.Provider
			value={{ appState, loggedIn: { isLoggedIn, setLoggedIn } }}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useAppState = () => useContext(StateContext);
