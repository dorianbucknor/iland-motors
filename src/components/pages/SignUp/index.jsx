import { ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import { useAppState } from "../../../StateProvider.jsx";
import { useHistory } from "react-router";
import * as Yup from "yup";
import "./index.css";
import { TextField, Checkbox } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import googleIcon from "../../../media/pictures/googleicon.png";
import { Button, Header, Footer } from "../../sub_components";
import { auth, database, firebase } from "../../../user";
import { Link } from "react-router-dom";

function CreateAccount() {
	const { appState } = useAppState();
	const [{ user }, dispatch] = appState;
	const styles = {
		form: {
			display: "flex",
			flexDirection: "column",
			colour: "black",
			width: "100%",
		},
		error: {
			color: "red",
			fontSize: "10px",
			fontStyle: "italic",
			margin: "0",
			width: "100%",
			textAlign: "left",
		},
	};

	const history = useHistory();

	const pswdRegex =
		/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

	const schema = Yup.object({
		email: Yup.string().email("Invalid email!").required("Required!"),

		firstName: Yup.string()
			.min(1, "First name must me more than one characters")
			.required("First name is required"),

		lastName: Yup.string()
			.min(1, "Last name must me more than one characters")
			.required("Last name is required"),

		password: Yup.string()
			.min(8, "Password must be at least 8 characters!")
			.max(24, "Password can be maximum 24 characters!")
			.matches(pswdRegex, "Pasword is not strong enough!")
			.required("Required!"),
	});

	let formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			acceptTerms: false,
		},
		initialErrors: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			acceptTerms: "",
		},
		validationSchema: schema,
	});
	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "acceptTerms") {
			let isChecked = e.target.checked;
		} else {
		}
	};

	const [error, setError] = useState(null);

	return (
		<div className="formPage">
			<Header />
			<div className="formPage__main">
				{user?.emailVerified ? (
					<div className="authForm">
						<h1 className="formTitle">Verify Email</h1>

						{user?.emailVerified ? (
							<div>
								<div>
									<p>Your Email Has Been Verified</p>
								</div>
								<div>
									<Button
										href="/sign-up/add-info"
										variant="contained"
										color="primary"
									>
										Continue
									</Button>
								</div>
							</div>
						) : (
							<div>
								<p>
									Check Your Email at{" "}
									<b>{user?.email || "you@example.com"}</b>
									for a email verification link.
								</p>
							</div>
						)}
					</div>
				) : (
					<div className="authForm__container">
						<h1 className="formTitle">Create Account</h1>
						<br />
						<form
							className="authForm"
							onSubmit={async (e) => {
								e.preventDefault();
								try {
									let newAcc =
										await auth.createUserWithEmailAndPassword(
											formik.values.email,
											formik.values.password
										);
									newAcc.user.updateProfile({
										displayName:
											formik.values.firstName +
											" " +
											formik.values.lastName,
									});
									await database
										.collection("users")
										.doc(newAcc.user.uid)
										.set({
											firstName: formik.values.firstName,
											lastName: formik.values.lastName,
											termsAccepted:
												formik.values.acceptTerms,
											email: formik.values.email,
											dateCreated:
												firebase.firestore.FieldValue.serverTimestamp(),
										});
									history.push("/add-info");
								} catch (error) {
									console.log(error);
									setError(error?.message);
								}
							}}
							style={styles.form}
						>
							<TextField
								label="First Name:"
								id="firstName"
								name="firstName"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
								fullWidth={true}
							/>
							{formik.errors.firstName &&
							formik.touched.firstName ? (
								<p style={styles.error}>
									{formik.errors.firstName}
								</p>
							) : null}

							<TextField
								label="Last Name:"
								id="lastName"
								name="lastName"
								type="text"
								fullWidth={true}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
								style={{ width: "100%" }}
							/>
							{formik.errors.lastName &&
							formik.touched.lastName ? (
								<p style={styles.error}>
									{formik.errors.lastName}
								</p>
							) : null}

							<TextField
								label="Email:"
								id="email"
								name="email"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type="email"
								value={formik.values.email}
								fullWidth={true}
							/>
							{formik.errors.email && formik.touched.email ? (
								<p style={styles.error}>
									{formik.errors.email}
								</p>
							) : null}

							<TextField
								type="password"
								onBlur={formik.handleBlur}
								name="password"
								id="password"
								value={formik.values.password}
								label="Password:"
								onChange={formik.handleChange}
								fullWidth={true}
							/>
							{formik.errors.password &&
							formik.touched.password ? (
								<p style={styles.error}>
									{formik.errors.password}
								</p>
							) : null}
							<br />
							<div
								style={{
									color: "var(--accent-1)",
									fontSize: 14,
								}}
							>
								<Checkbox
									id="acceptTerms"
									name="acceptTerms"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.acceptTerms}
									required
									style={{
										color: "var(--primary-color)",
									}}
								/>
								I accept ILand Motor's{" "}
								<a
									rel="noreferrer"
									target="_blank"
									style={{
										color: "var(--accent-2)",
									}}
									href="#terms"
								>
									Terms of Service.
								</a>
							</div>

							<br />
							<Button
								type="submit"
								color="var(--neutral-1)"
								bgcolor="var(--primary-color)"
								disabled={!formik.isValid}
								fullWidth={true}
							>
								Submit
							</Button>
						</form>
						{/* <div
							style={{
								width: "100%",
								textAlign: "center",
								color: "blue",
								textDecoration: "underline",
								cursor: "pointer",
							}}
							onClick={async () => {
								if (
									formik.values.email &&
									formik.values.email !== " "
								) {
									try {
										await auth.sendPasswordResetEmail(
											formik.values.email,
											{
												url: "https://ilandmotors.com/auth/password-reset",
											}
										);
									} catch (error) {
										console.log(error);
										setError(error?.message);
									}
								} else {
									setError(
										"Please enter email address for password reset."
									);
								}
							}}
						>
							<h6>Reset Password</h6>
						</div> */}
						<br />

						<div className="signUp__altLogIn">
							<Button
								fullWidth={true}
								startIcon={
									<img
										style={{
											width: "14px",
											height: "auto",
										}}
										src={googleIcon}
										alt="Google"
									/>
								}
								onClick={async () => {
									try {
										let newAcc = await auth.signInWithPopup(
											new firebase.auth.GoogleAuthProvider()
										);
										let name =
											newAcc.user.displayName.split(" ");
										await database
											.collection("users")
											.doc(newAcc.user.uid)
											.set({
												firstName: name[0],
												lastName: name[name.length - 1],
												termsAccepted: true,
												email: newAcc.user.email,
												dateCreated:
													firebase.firestore.FieldValue.serverTimestamp(),
											});
										history.push("/my-account");
									} catch (error) {
										console.log(error);
										setError(error?.message);
									}
								}}
							>
								Google
							</Button>
							<br />
							<div
								style={{
									fontSize: 14,
								}}
							>
								Already Have An Account?{" "}
								<Link
									style={{
										color: "var(--accent-2)",
									}}
									to="/sign-in"
								>
									Sign In
								</Link>
							</div>
						</div>
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
				)}
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default CreateAccount;
