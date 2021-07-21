import React, { useState } from "react";
import { Button } from "../Form";
import "./index.css";
import { useAppState } from "../../../StateProvider.jsx";
import QuickView from "../QuickView";

function VehicleListBox({ listBox, pageRef, vehicleId, vehicleInfo }) {
	const { appState } = useAppState();
	const [state, dispatch] = appState;
	const [popUpOpen, setPopUpOpen] = useState(false);

	return (
		<div className="vehicleListBox">
			<div
				className={popUpOpen ? "quickView__overlay show" : "hide"}
				onClick={() => {
					setPopUpOpen(false);
				}}
			/>
			<QuickView
				openPopup={setPopUpOpen}
				vehicleInfo={vehicleInfo}
				vehicleId={vehicleId}
				pageRef={pageRef}
				popUpOpen={popUpOpen}
			/>
			{listBox ? (
				<div className="vehicleListBox__list">
					<img
						src={
							vehicleInfo?.picture ||
							"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
						}
						alt={vehicleInfo?.vehicleName}
						className="list__picture"
					/>
					<div className="list__info-btns">
						<div className="list__info">
							<div className="list__price-title">
								<h1 className="list__title">
									{vehicleInfo?.vehicleName || "ILM1000A"}
								</h1>
								<h3 className="list__price">
									${vehicleInfo?.price || "159, 999.99"}
								</h3>
							</div>

							<div className="list__mechanics">
								<div>
									<i className="flaticon-030-engine engineIcon"></i>
									<p>{vehicleInfo?.mechanics?.hp || 15}hp</p>
								</div>
								<div>
									<i className="flaticon-042-crankshaft engineIcon"></i>
									<p>{vehicleInfo?.mechanics?.cc || 250}cc</p>
								</div>
								<div>
									<i className="flaticon-011-gear engineIcon"></i>
									<p>
										{vehicleInfo?.mechanics?.transmission ||
											"Automatic"}
									</p>
								</div>
								<div>
									<i className="flaticon-001-chassis engineIcon"></i>
									<p>
										{vehicleInfo?.mechanics?.driveTrain ||
											"Rear Wheel Drive (RWD)"}
									</p>
								</div>
								<div>
									<i className="flaticon-046-speedometer engineIcon"></i>
									<p>
										{vehicleInfo?.mechanics?.speed || 80}
										km/h
									</p>
								</div>
							</div>
							<p className="list__description">
								{vehicleInfo?.description ||
									"Well Built. Well Made come an get it. Yuh zimi. Yh."}
							</p>
						</div>
						<div className="list__btns">
							<Button
								type="button"
								onClick={() => {
									if (popUpOpen) {
										setPopUpOpen(false);
									} else {
										setPopUpOpen(true);
									}
								}}
								small={true}
							>
								Quick View
							</Button>
							<Button
								type="button"
								small={true}
								onClick={() => {
									dispatch({
										type: "ADD_TO_BASKET",
										item: {
											info: {
												vehicleId: vehicleId || "234",
												description:
													vehicleInfo?.description ||
													"built",
												mechanics:
													vehicleInfo?.mechanics ||
													{},
												price:
													vehicleInfo?.price ||
													989809,
												vehicleName:
													vehicleInfo?.vehicleName ||
													"thing",
												customizations: "none",
											},
											count: 1,
										},
									});
								}}
							>
								Add To Order
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="vehicleListBox__gridBox">
					<img
						src={
							vehicleInfo?.picture ||
							"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
						}
						alt={vehicleInfo?.vehicleName}
						className="gridBox__picture"
					/>
					<div className="gridBox__info-btns">
						<div className="gridBox__info">
							<h1 className="gridBox__title">
								{vehicleInfo?.vehicleName || "ILM1000A"}
							</h1>
							<h3 className="gridBox__price">
								{vehicleInfo?.price || 1}
							</h3>
							<div className="gridBox__mechanics">
								<div>
									<div>
										<i className="flaticon-030-engine engineIcon"></i>
										{/* <h4>Horse Power:</h4> */}
									</div>

									<p>{vehicleInfo?.mechanics?.hp || 15}hp</p>
								</div>
								<div>
									<div>
										<i className="flaticon-042-crankshaft engineIcon"></i>
										{/* <h4>Cubic Capacity:</h4> */}
									</div>

									<p>{vehicleInfo?.mechanics?.cc || 250}cc</p>
								</div>
								<div>
									<div>
										<i className="flaticon-011-gear engineIcon"></i>
										{/* <h4> Transmission: </h4> */}
									</div>

									<p>
										{vehicleInfo?.mechanics?.transmission ||
											"Automatic"}
									</p>
								</div>
								<div>
									<div>
										<i className="flaticon-001-chassis engineIcon"></i>
										{/* <h4>Drive Train: </h4>{" "} */}
									</div>

									<p>
										{vehicleInfo?.mechanics?.driveTrain ||
											"Rear Wheel Drive (RWD)"}
									</p>
								</div>
								<div>
									<div>
										<i className="flaticon-046-speedometer engineIcon"></i>
										{/* <h4>Speed: </h4> */}
									</div>

									<p>
										{vehicleInfo?.mechanics?.speed || 80}
										km/h
									</p>
								</div>
							</div>
							<p className="gridBox__description">
								{vehicleInfo?.description || "Well Built"}
							</p>
						</div>
						<div className="gridBox__btns">
							<Button
								type="button"
								onClick={() => {
									if (popUpOpen) {
										setPopUpOpen(false);
									} else {
										setPopUpOpen(true);
									}
								}}
							>
								Quick View
							</Button>
							<Button
								type="button"
								onClick={() => {
									dispatch({
										type: "ADD_TO_BASKET",
										item: {
											info: {
												vehicleId: vehicleId || "dfhee",
												description:
													vehicleInfo?.description ||
													"erf",
												mechanics:
													vehicleInfo?.mechanics ||
													{},
												price:
													vehicleInfo?.price || 2343,
												vehicleName:
													vehicleInfo?.vehicleName ||
													"naa",
												customizations: "none",
											},
											count: 1,
										},
									});
								}}
							>
								Add To Cart
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default VehicleListBox;
