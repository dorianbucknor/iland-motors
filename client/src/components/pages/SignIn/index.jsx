import { TextField } from "@material-ui/core";
import { ErrorMessage, Formik, useFormik } from "formik";
import React, { useState } from "react";
import "./index.css";
import { useHistory } from "react-router";
import googleIcon from "../../../media/pictures/googleicon.png";
import * as Yup from "yup";
import { useAppState } from "../../../StateProvider.jsx";
import { Facebook } from "@material-ui/icons";
import { Button, Header, Footer } from "../../sub_components";
import { auth, database, firebase } from "../../../user";
import { Link } from "react-router-dom";

function SignIn() {
	const styles = {
		form: {
			display: "flex",
			flexDirection: "column",
			colour: "black",
			width: "100%",
		},
		error: {
			color: "red",
			fontSize: "12px",
			fontStyle: "italic",
		},
	};

	const schema = Yup.object().shape({
		email: Yup.string().email("Invalid email!").required("Required!"),

		password: Yup.string()
			.min(8, "Password must be at least 8 characters!")
			.max(24, "Password can be maximum 24 characters!")
			.required("Required!"),
	});
	const [error, setError] = useState(null);
	const history = useHistory();

	// const onChange = (e) => {};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		initialErrors: {
			email: "",
			password: "",
		},
	});
	return (
		<div className="formPage">
			<Header />
			<div className="formPage__main">
				<div className="authForm__container">
					<h1 className="formTitle">Sign In</h1>
					<br />

					<form
						className="authForm"
						onSubmit={async (e) => {
							e.preventDefault();
							try {
								await auth.signInWithEmailAndPassword(
									formik.values.email,
									formik.values.password
								);
								history.push("/my-account");
							} catch (error) {
								console.log(error);
								setError(error?.message);
							}
						}}
						style={styles.form}
					>
						<TextField
							fullWidth={true}
							size="medium"
							type="email"
							onBlur={formik.handleBlur}
							name="email"
							id="email"
							value={formik.values.email}
							label="Email:"
							onChange={formik.handleChange}
						/>

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

						<br />
						<Button
							disabled={!formik.isValid}
							color="var(--neutral-1)"
							type="submit"
							fullWidth={true}
							bgcolor="var(--primary-color)"
						>
							Log In
						</Button>
						<div
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
						</div>
					</form>
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
								color: "var(--accent-1)",
								fontSize: 14,
							}}
						>
							Don't Have An Account?{" "}
							<Link
								style={{
									color: "var(--accent-2)",
								}}
								to="/sign-up"
							>
								Create One
							</Link>
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
										fontSize: "12px",
									}}
								>
									{error}
								</p>
							) : null}
						</div>
					</div>
				</div>
			</div>
			{/* <Footer /> */}
		</div>
	);
}
export default SignIn;
