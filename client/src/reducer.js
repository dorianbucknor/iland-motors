export const initialState = {
	basket: [],
	user: { auth: null, data: null },
	vehicles: [],
	customVehicles: [],
};

// Selector
export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.info.price * item.count + amount, 0);

const reducer = (state, action) => {
	console.log("reducer");
	switch (action.type) {
		case "ADD_TO_BASKET":
			let tempBasket = [...state.basket];

			if (state.basket.length > 0) {
				const index = state.basket.findIndex(
					(item) =>
						JSON.stringify(item?.info) ===
						JSON.stringify(action.item?.info)
				);

				let tempItem;
				if (index >= 0) {
					tempItem = tempBasket.splice(index, 1)[0];
				}

				if (tempItem) {
					tempItem.count = tempItem.count + action.item.count;
					tempBasket.push(tempItem);
				} else {
					tempBasket.push(action.item);
				}
			} else {
				tempBasket.push(action.item);
			}

			return {
				user: state.user,
				vehicles: state.vehicles,
				customVehicles: state.customVehicles,
				basket: tempBasket,
			};
		case "UPDATE_BASKET_ITEM":
			let updatedBasket = [...state.basket];
			const itemIndex = state.basket.findIndex(
				(item) =>
					JSON.stringify(item?.info) ===
					JSON.stringify(action.item?.info)
			);

			updatedBasket.splice(itemIndex, 1, action.item);
			return {
				...state,
				basket: updatedBasket,
			};
		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};
		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);

			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Cant Remove Item (id: ${action.id}) as its not in basket!`
				);
			}

			return {
				...state,
				basket: newBasket,
			};
		case "SET_USER":
			return {
				...state,
				user: { auth: action.auth, data: action.data },
			};
		case "SET_VEHICLES":
			return {
				...state,
				vehicles: action.vehicles,
			};
		case "ADD_TO_CUSTOM":
			return {
				...state,
				customVehicles: [...state.customVehicles, action.item],
			};
		case "REMOVE_FROM_CUSTOM":
			const idx = state.customVehicles.findIndex(
				(vhcl) => vhcl.id === action.id
			);

			let newCustomVehicles = [...state.customVehicles];

			if (index >= 0) {
				newCustomVehicles.splice(idx, 1);
			} else {
				console.warn(
					`Cant Remove Vehicle (id: ${action.id}) as its not in basket!`
				);
			}
			return {
				...state,
				customVehicles: newCustomVehicles,
			};
		default:
			return state;
	}
};

export default reducer;
