import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import {
	Header,
	Footer,
	ModelViewer,
	Button,
	VehicleListBox,
} from "../../sub_components";
import { useAppState } from "../../../StateProvider.jsx";
import ColorSwatch, {
	ColorSwatchGroup,
	CustomizeOption,
	CustomizeSelect,
} from "../../sub_components/ColorSwatch";

function ProductPage({ vehicleId }) {
	const productPageRef = useRef();
	const [vehicleInfo, setVehicleInfo] = useState({});
	const { appState } = useAppState();
	const [{ vehicles, user, basket }, dispatch] = appState;
	const [customizations, setCustomizations] = useState({});
	const [qty, setQty] = useState(1);

	useEffect(() => {
		setVehicleInfo(vehicles[vehicleId]);

		return () => {};
	}, [vehicleId, vehicles]);

	return (
		<div className="productPage" ref={productPageRef}>
			<Header />
			<div className="productPage__main">
				{/* row1 */}
				<div className="productPage__3dView-info">
					<div className="productPage__modelViewer">
						<ModelViewer
							pageRef={productPageRef}
							modelName={vehicleInfo?.vehicleNames || "model1"}
							enable={false}
						/>
					</div>
					<div className="productPage__vehicleInfo-customization">
						<div className="productPage__vehicleInfo">
							<h1 className="productPage__title">
								{vehicleInfo?.vehicleName || "ILM1000A"}
							</h1>
							<h2 className="productPage__price">
								${vehicleInfo?.price || 1}
							</h2>
							<p className="productPage__description">
								{vehicleInfo?.description || "Well Built"}
							</p>
							<div className="productPage__mechanics">
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
										{vehicleInfo?.mechanics?.fuelTank || 90}{" "}
										litres
									</p>
								</div>
								<div>
									<div>
										<i className="flaticon-025-wheel engineIcon"></i>
										<h4>Wheel: </h4>
									</div>
									<p>
										{(vehicleInfo?.mechanics?.wheelSize ||
											18) +
											'" - ' +
											(vehicleInfo?.mechanics
												?.wheelType || "Off-Road")}
									</p>
								</div>
							</div>
							<div className="productPage__customization"></div>
						</div>
						<Button
							id="add-to-basket-btn"
							type="button"
							fullWidth={true}
							onButtonClick={() => {
								dispatch({
									type: "ADD_TO_BASKET",
									item: {
										info: {
											vehicleId: vehicleId || "234566",
											description:
												vehicleInfo?.description ||
												"desc",
											mechanics:
												vehicleInfo?.mechanics || {},
											price: vehicleInfo?.price || 3455,
											vehicleName:
												vehicleInfo?.vehicleName ||
												"name",
											customizations: "none",
										},
										count: qty,
									},
								});
							}}
						>
							Add To Order
						</Button>
					</div>
				</div>
				<hr
					style={{
						color: "#80808062",
						backgroundColor: "#80808062",
						height: 0.4,
						width: "100%",
						border: "none",
					}}
				/>
				{/* row 2 */}
				<div className="productPage__customize">
					<h2>Customize</h2>
					<div className="productPage__customze-options">
						<div className="customize__color">
							<div>
								<h3>Color</h3>{" "}
							</div>

							<ColorSwatchGroup
								selectedValue={(value) => {
									setCustomizations((prev) => {
										return { ...prev, color: value };
									});
								}}
							>
								{({
									selectedSwatch,
									handleChange,
									colorGroupRef,
								}) => (
									<>
										<ColorSwatch
											colors={["blue", "red", "black"]}
											selectedSwatch={selectedSwatch}
											onChange={handleChange}
											swatchName="swatch1"
										/>
										<ColorSwatch
											colors={["green", "purple", "aqua"]}
											selectedSwatch={selectedSwatch}
											onChange={handleChange}
											swatchName="swatch2"
										/>
										<ColorSwatch
											colors={["gold", "pink", "black"]}
											selectedSwatch={selectedSwatch}
											onChange={handleChange}
											swatchName="swatch3"
										/>
										<ColorSwatch
											colors={[
												"brown",
												"purple",
												"tomato",
											]}
											selectedSwatch={selectedSwatch}
											onChange={handleChange}
											swatchName="swatch4"
										/>
									</>
								)}
							</ColorSwatchGroup>
						</div>
						<div className="customise__engine">
							<h3>Engine</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, engine: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="250cc"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="600cc"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="800cc"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="1000cc"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__drivetrain">
							<div>
								<h3>Drive Train</h3>
							</div>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, driveTrain: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="All Wheel Drive (AWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="4 Wheel Drive (4WD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Rear Wheel Drive (RWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Front Wheeel Drive (FWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__transmission">
							<i className="flaticon-011-gear engineIcon"></i>
							<h3> Transmission</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, transmission: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="Automatic"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Manual - Stick Shift"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Manual - Padle Shift"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						{/* <div className="customise__suspension">
						<h3>Suspension</h3>
					    </div> */}
						<div className="customise__wheels">
							<h3>Wheels</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, wheels: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="14 inches"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="18 inches"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="22 inches"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="28 inches"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__seats">
							<h3>Seat</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, seat: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="High Back Regular"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="High Back Racing"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__seatBelt">
							<h3>Seat Belt</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, seatBelt: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="3 Point Harness"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="4 Point Harness"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="5 Point Harness"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__drivetrain">
							<div>
								<h3>Drive Train</h3>
							</div>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, driveTrain: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="All Wheel Drive (AWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="4 Wheel Drive (4WD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Rear Wheel Drive (RWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Front Wheeel Drive (FWD)"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
						<div className="customise__transmission">
							<i className="flaticon-011-gear engineIcon"></i>
							<h3> Transmission</h3>
							<CustomizeSelect
								getSelected={(value) => {
									setCustomizations((prev) => {
										return { ...prev, transmission: value };
									});
								}}
							>
								{({ selectedValue, handleChange }) => (
									<>
										<CustomizeOption
											picture=""
											value="Automatic"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Manual - Stick Shift"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
										<CustomizeOption
											picture=""
											value="Manual - Padle Shift"
											selectedValue={selectedValue}
											onChange={handleChange}
										/>
									</>
								)}
							</CustomizeSelect>
						</div>
					</div>
					<div className="productPage__customize-btns">
						<Button>Save Customization</Button>
						{/* <Button>Apply</Button> */}
					</div>
				</div>

				<hr
					style={{
						color: "#80808062",
						backgroundColor: "#80808062",
						height: 0.4,
						width: "100%",
						border: "none",
					}}
				/>
				{/* row 3 */}
				<div className="productPage__extraInfo">fghjk</div>
				<hr
					style={{
						color: "#80808062",
						backgroundColor: "#80808062",
						height: 0.4,
						width: "100%",
						border: "none",
					}}
				/>
				{/* row 4 */}
				<div className="productPage__featured">
					<div>
						<VehicleListBox />
						<VehicleListBox />
						<VehicleListBox />
					</div>
					<div>
						<VehicleListBox listBox={true} />
						<VehicleListBox listBox={true} />
						<VehicleListBox listBox={true} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ProductPage;
