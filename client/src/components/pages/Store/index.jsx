import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useRef } from "react";
import { useAppState } from "../../../StateProvider";
import { Footer, Header, Range, VehicleListBox } from "../../sub_components";
import "./index.css";

function Store() {
	const { appState } = useAppState();
	const [{ vehicles }, dispatch] = appState;
	const pageRef = useRef();
	return (
		<div className="store" ref={pageRef}>
			<Header />
			<div className="store__main">
				<div className="store__feature"></div>
				<div className="store__filter">
					<div className="filter__search">
						{/* <label htmlFor="search">Search: </label> */}
						<input type="search" name="search" id="search" />
						<IconButton id="search-icon-btn">
							<Search id="search-icon" />
						</IconButton>
					</div>

					<div className="filter__options">
						<div className="filter__vehicleType">
							<label htmlFor="vehicleType">Vehicle Type: </label>
							<select name="vehicleType" id="vehicleType">
								<option value="kart">Kart</option>
								<option value="buggy">Buggy</option>
							</select>
						</div>
						<div className="filter__gearbox">
							<label htmlFor="withReverse">With Reverse: </label>{" "}
							<input
								type="checkbox"
								name="withReverse"
								id="withReverse"
							/>
						</div>
						<div className="filter__price">
							<label htmlFor="price-range">$ </label>
							<Range max={2000000} min={200000} gap={50000} />
						</div>
						<div className="filter__cc">
							<i className="flaticon-042-crankshaft engineIcon"></i>
							<Range max={1200} min={100} gap={50} />
						</div>
						<div className="filter__transmission">
							{/* <label htmlFor="transmission">Transmission: </label> */}
							<i className="flaticon-011-gear engineIcon"></i>
							<FormControl fullWidth={true}>
								<InputLabel>Transmission: </InputLabel>
								<Select
									id="gender"
									name="gender"
									fullWidth={true}
									required={true}
                                    
								>
									<MenuItem value="automatic">
										Automatic
									</MenuItem>
									<MenuItem value="paddleshifter">
										Manual - Paddle Shift
									</MenuItem>
									<MenuItem value="stickshift">
										Manual - Stick Shift
									</MenuItem>
								</Select>
							</FormControl>
							{/* <select name="transmission" id="transmission">
								<option value="automatic">Automatic</option>
								<option value="paddleshifter">
									Manual - Paddle Shift
								</option>
								<option value="stickshift">
									Manual - Stick Shift
								</option>
							</select> */}
						</div>
						<div className="filter__driveTrain">
							<i className="flaticon-001-chassis engineIcon"></i>
							<select name="driveTrain" id="driveTrain">
								<option value="rwd">
									Rear Wheel Drive (RWD)
								</option>
								<option value="fwd">
									Front Wheel Drive (FWD)
								</option>
								<option value="awd">
									All Wheel Drive (AWD)
								</option>
								<option value="4wd">4 Wheel Drive (4WD)</option>
							</select>
						</div>
					</div>
				</div>
				<div className="store__products">
					{/* {[" ", " ", " ", " ", " "].map((item, idx) => (
						<VehicleListBox
							key={idx}
							id={"product" + (idx + 1)}
							pageRef={pageRef}
							listBox={false}
							vehicleId={item?.id}
							vehicleInfo={item?.info}
						/>
					))} */}
					<div className="store__row">
						<VehicleListBox
							pageRef={pageRef}
							listBox={true}
							vehicleId={vehicles[0]?.id}
							vehicleInfo={vehicles[0]?.info}
						/>
						<VehicleListBox
							pageRef={pageRef}
							listBox={true}
							vehicleId={vehicles[0]?.id}
							vehicleInfo={vehicles[0]?.info}
						/>
						<VehicleListBox
							pageRef={pageRef}
							listBox={true}
							vehicleId={vehicles[0]?.id}
							vehicleInfo={vehicles[0]?.info}
						/>
						<VehicleListBox
							pageRef={pageRef}
							listBox={true}
							vehicleId={vehicles[0]?.id}
							vehicleInfo={vehicles[0]?.info}
						/>
						<VehicleListBox
							pageRef={pageRef}
							listBox={true}
							vehicleId={vehicles[0]?.id}
							vehicleInfo={vehicles[0]?.info}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Store;
