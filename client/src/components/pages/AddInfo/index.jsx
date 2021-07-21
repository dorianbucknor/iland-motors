import React, { useState } from "react";
import "./index.css";
import { useFormik } from "formik";
import { Header, Button, Footer } from "../../sub_components";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@material-ui/core";
import { useAppState } from "../../../StateProvider.jsx";
import { auth, database } from "../../../user";
import { useHistory } from "react-router-dom";

function AddInfo() {
	const { appState } = useAppState();
	const [{ user }, dispatch] = appState;
	const [error, setError] = useState(null);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			dateOfBirth: "",
			gender: "",
			street: "",
			state: "",
			country: "",
			zipCode: "",
		},
		initialErrors: {
			dateOfBirth: "",
			gender: "",
			street: "",
			state: "",
			country: "",
			zipCode: "",
		},
	});
	return (
		<div className="addInfo formPage">
			<Header />
			<div className="formPage__main">
				<div className="addInfo__container">
					<h2>Add Info</h2>
					<br />
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							try {
								await database
									.collection("users")
									.doc(user.auth?.uid)
									.set(
										{
											dateOfBirth:
												formik.values.dateOfBirth,
											gender: formik.values.gender,
											address: {
												street: formik.values.street,
												state: formik.values.state,
												country: formik.values.country,
												zipCode:
													formik.values.zipCode ||
													"N/A",
											},
										},
										{ merge: true }
									);
								history.push("/my-account");
							} catch (error) {
								console.log(error);
								setError(error?.message);
							}
						}}
						className="addInfo__form"
					>
						<TextField
							type="date"
							id="dateOfBirth"
							name="dateOfBirth"
							label="Date of Birth: "
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.dateOfBirth}
							fullWidth={true}
							helperText="Format: mm/dd/yyy"
							required={true}
						/>
						<FormControl fullWidth={true}>
							<InputLabel>Gender: </InputLabel>
							<Select
								id="gender"
								name="gender"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.gender}
								fullWidth={true}
								required={true}
							>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
							</Select>
						</FormControl>
						<br />
						<h2>Address</h2>
						<TextField
							id="street"
							name="street"
							label="Street:"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.street}
							required={true}
							fullWidth={true}
						/>
						<TextField
							id="state"
							name="state"
							label="State/Parish: "
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.state}
							required={true}
							fullWidth={true}
						/>
						<TextField
							id="country"
							name="country"
							label="Country: "
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.country}
							required={true}
							fullWidth={true}
						/>
						<TextField
							id="zipCode"
							name="zipCode"
							label="Zip Code: "
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.zipCode}
							fullWidth={true}
						/>
						<br />
						<Button
							type="submit"
							fullWidth={true}
							disable={!formik.isValid}
						>
							Submit
						</Button>
					</form>
					<div
						style={{
							maxHeight: "70px",
							overflow: "hidden",
						}}
					>
						{error ? (
							<p
								style={{
									color: "red",
									fontSize: "10px",
								}}
							>
								{error}
							</p>
						) : null}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default AddInfo;
