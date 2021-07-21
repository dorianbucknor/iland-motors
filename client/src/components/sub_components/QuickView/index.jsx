import React, { useEffect, useRef } from "react";
import { Button } from "../Form";
import { useAppState } from "../../../StateProvider.jsx";
import "./index.css";
import { ModelViewer } from "..";
import { useHistory } from "react-router-dom";

function QuickView({
	popUpOpen,
	pageRef,
	vehicleId,
	vehicleInfo,
	closePopup: openPopup,
}) {
	const popupRef = useRef();
	const { appState } = useAppState();
	const [state, dispatch] = appState;
	const history = useHistory();

	useEffect(() => {
		// if (pageRef) {
		// 	if (popUpOpen) {

		//     }
		// }

		if (popUpOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => {};
	}, [popUpOpen]);

	return (
		<div
			className={
				popUpOpen
					? "quickView quickView__show"
					: "quickView quickView__hide"
			}
			ref={popupRef}
		>
			<div className="quickView__modelViewer">
				<ModelViewer
					pageRef={pageRef}
					modelName={vehicleInfo?.vehicleName || "Old School"}
					enable={popUpOpen}
				/>
			</div>
			<div className="quickView__info-btns">
				<div className="quickView__info">
					<h1 className="quickView__title">
						{vehicleInfo?.vehicleName || "ILM1000A"}
					</h1>
					<h2 className="quickView__price">
						${vehicleInfo?.price || 1}
					</h2>
					<p className="quickView__description">
						{vehicleInfo?.description || "Well Built"}
					</p>
					<div className="quickView__mechanics">
						<div>
							<div>
								<i className="flaticon-030-engine engineIcon"></i>
								<h4>Horse Power:</h4>
							</div>

							<p>{vehicleInfo?.mechanics?.hp || 15}hp</p>
						</div>
						<div>
							<div>
								<i className="flaticon-042-crankshaft engineIcon"></i>
								<h4>Cubic Capacity:</h4>
							</div>

							<p>{vehicleInfo?.mechanics?.cc || 250}cc</p>
						</div>
						<div>
							<div>
								<i className="flaticon-011-gear engineIcon"></i>
								<h4> Transmission: </h4>
							</div>

							<p>
								{vehicleInfo?.mechanics?.transmission ||
									"Automatic"}
							</p>
						</div>
						<div>
							<div>
								<i className="flaticon-001-chassis engineIcon"></i>
								<h4>Drive Train: </h4>{" "}
							</div>

							<p>
								{vehicleInfo?.mechanics?.driveTrain ||
									"Rear Wheel Drive (RWD)"}
							</p>
						</div>
						<div>
							<div>
								<i className="flaticon-046-speedometer engineIcon"></i>
								<h4>Speed: </h4>
							</div>

							<p>
								{vehicleInfo?.mechanics?.speed || 80}
								km/h
							</p>
						</div>
						<div>
							<div>
								<i className="flaticon-029-damper engineIcon"></i>
								<h4>Suspension: </h4>
							</div>

							<p>
								{vehicleInfo?.mechanics?.suspension ||
									"Rear & Front"}
							</p>
						</div>
						<div>
							{/* <h4>Off-Roading: </h4>
									<p>
										{vehicleInfo?.mechanics?.offRoad
											? "Yes"
											: "Not Recomended" || "No"}
									</p> */}
							<div>
								<i className="flaticon-005-car-key engineIcon"></i>
								<h4>Start Type:</h4>
							</div>

							<p>
								{vehicleInfo?.mechanics?.starter ||
									"Button Start"}
							</p>
						</div>
						<div>
							<div>
								<i className="flaticon-039-jerrycan engineIcon"></i>
								<h4>Fuel Tank: </h4>
							</div>

							<p>
								{vehicleInfo?.mechanics?.fuelTank || 90} litres
							</p>
						</div>
						<div>
							<div>
								<i className="flaticon-025-wheel engineIcon"></i>
								<h4>Wheel: </h4>
							</div>
							<p>
								{(vehicleInfo?.mechanics?.wheelSize || 18) +
									'" - ' +
									(vehicleInfo?.mechanics?.wheelType ||
										"Off-Road")}
							</p>
						</div>
					</div>
				</div>
				<div className="quickView__btns">
					<Button
						type="button"
						onClick={() => {
							if (popUpOpen) {
								if (typeof popUpOpen === "function")
									openPopup(false);
							}
							history.push(
								`/vehicle/${vehicleInfo?.vehicleName || "vcle"}`
							);
						}}
					>
						View Full Details
					</Button>
					<Button
						type="button"
						disabled={!popUpOpen}
						onClick={() => {
							dispatch({
								type: "ADD_TO_BASKET",
								item: {
									info: {
										vehicleId: vehicleId || "edfcvgh6tr",
										description:
											vehicleInfo?.description ||
											"wedfcw34",
										mechanics: vehicleInfo?.mechanics || {},
										price: vehicleInfo?.price || 456787,
										vehicleName:
											vehicleInfo?.vehicleName || "werf",
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
	);
}

export default QuickView;
