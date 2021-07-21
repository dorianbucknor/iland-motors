import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import { Header, Footer, Button, VehicleListBox } from "../../sub_components";
import { useAppState } from "../../../StateProvider.jsx";
import { Checkbox } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "../../../reducer.js";
import useLocalStorage from "../../../useLocalStorage";

function Trailer() {
	const { appState } = useAppState();
	const [{ basket }, dispatch] = appState;
	const [subtotal, setSubtotal] = useState(0);
	const selectRef = useRef();
	const history = useHistory();
	const [trailer, updateTrailer] = useLocalStorage("trailer", [...basket]);

	const arraysMatch = function (arr1, arr2) {
		if (arr1.length !== arr2.length) return false;

		for (var i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	};

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div className="trailer">
			<Header />
			<div className="trailer__main">
				<div className="trailer__left">
					<div className="trailer__items">
						<h2>Shopping Cart </h2>
						<hr
							style={{
								color: "#80808062",
								backgroundColor: "#80808062",
								height: 0.4,
								width: "90%",
								border: "none",
							}}
						/>
						{basket.length > 0 ? (
							basket.map((item, idx) => (
								<div className="trailer__item" key={idx}>
									<img
										src={
											item?.info?.picture ||
											"https://images-na.ssl-images-amazon.com/images/I/613qMkiCWjL._AC_SY450_.jpg"
										}
										alt=""
										id="item-picture"
									/>
									<div id="item-info">
										<div className="item__name-price">
											<h3 id="item-name">
												{item?.info?.name || "Helmet"}
											</h3>
											<h5 id="item-price">
												$
												{item?.info?.price *
													(item?.count || 1) ||
													"80, 000"}
											</h5>
										</div>

										{/* <p id="item-description">
										{item?.description || "Strong"}
									</p> */}

										{/* item?.type === "vehicle" */}
										{true ? (
											<div className="item__mechanics">
												<div>
													{/* <h4>Dimensions: </h4>
												<p>
													Width:{" "}
													{item.dimensions?.width ||
														46}
													" Height:{" "}
													{item?.dimensions?.height ||
														46}
													" Length:{" "}
													{item?.dimensions?.length ||
														120}
													"
												</p> */}
													<h4>Color: </h4>
													<p>
														{"P-" +
															(item?.info?.color
																?.primary ||
																"Red") +
															", S-" +
															(item?.color
																?.secondary ||
																"Black") +
															", A-" +
															(item?.color
																?.accent ||
																"None")}
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-030-engine engineIcon"></i>
												
											</div> */}
													<h4>Horse Power:</h4>
													<p>
														{item?.mechanics?.hp ||
															15}
														hp
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-042-crankshaft engineIcon"></i>
												
											</div> */}
													<h4>Cubic Capacity:</h4>
													<p>
														{item?.mechanics?.cc ||
															250}
														cc
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-011-gear engineIcon"></i>
												
											</div> */}
													<h4> Transmission: </h4>
													<p>
														{item?.mechanics
															?.transmission ||
															"Automatic"}
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-001-chassis engineIcon"></i>
												
											</div> */}
													<h4>Drive Train: </h4>
													<p>
														{item?.mechanics
															?.driveTrain ||
															"Rear Wheel Drive (RWD)"}
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-046-speedometer engineIcon"></i>
												
											</div> */}
													<h4>Speed: </h4>
													<p>
														{item?.mechanics
															?.speed || 80}
														km/h
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-029-damper engineIcon"></i>
												
											</div> */}
													<h4>Suspension: </h4>
													<p>
														{item?.mechanics
															?.suspension ||
															"Rear & Front"}
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-005-car-key engineIcon"></i>
												
											</div> */}
													<h4>Start Type:</h4>
													<p>
														{item?.mechanics
															?.starter ||
															"Button Start"}
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-039-jerrycan engineIcon"></i>
												
											</div> */}
													<h4>Fuel Tank: </h4>
													<p>
														{item?.mechanics
															?.fuelTank ||
															90}{" "}
														litres
													</p>
												</div>
												<div>
													{/* <div>
												<i className="flaticon-025-wheel engineIcon"></i>
											
											</div> */}
													<h4>Wheel: </h4>
													<p>
														{(item?.mechanics
															?.wheelSize || 18) +
															'" - ' +
															(item?.mechanics
																?.wheelType ||
																"Off-Road")}
													</p>
												</div>
											</div>
										) : null}
										<div className="item__controls">
											<Button
												// className="item__qty"
												type="button"
												// onButtonClick={() => {
												// 	selectRef.current.click();
												// }}
											>
												{/* <label htmlFor="item-count">
												Qty:
											</label> */}
												Qty:
												<select
													defaultValue={
														item?.count || 1
													}
													id="item-count"
													defaultChecked={true}
													// ref={selectRef}
													// onClick={() =>
													// 	console.log("click")
													// }
													onChange={(e) => {
														dispatch({
															type: "UPDATE_BASKET_ITEM",
															item: {
																info: item.info,
																count: parseInt(
																	e
																		.currentTarget
																		.value
																),
															},
														});
													}}
												>
													<option value={1}>
														{" "}
														1
													</option>
													<option value={2}>2</option>
													<option value={3}>3</option>
													<option value={4}>4</option>
													<option value={5}>5</option>
													<option value={6}>6</option>
													<option value={7}>7</option>
													<option value={8}>8</option>
													<option value={9}>9</option>
													<option value={10}>
														10+
													</option>
												</select>
											</Button>

											<Button
												type="button"
												onClick={() => {
													dispatch({
														type: "REMOVE_FROM_BASKET",
														id: item?.id,
													});
												}}
											>
												Remove
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<h3>Your basket is empty.</h3>
						)}
					</div>
				</div>
				<div className="trailer__right">
					<div className="trailer__checkout">
						<div className="trailer__subTotal">
							<h4>Sub-Total ({basket.length || 0} items): </h4>
							<b>${getBasketTotal(basket) || "0.00"}</b>
						</div>
						{/* <div className="trailer__deliver">
							<Checkbox title="Deliver" /> Deliver
						</div> */}
						<Button
							type="button"
							fullWidth={true}
							onClick={() => {
								history.push("/checkout");
							}}
						>
							Continue To Checkout
						</Button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Trailer;
