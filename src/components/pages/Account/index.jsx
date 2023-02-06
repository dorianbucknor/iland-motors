import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Header, Footer, Button } from "../../sub_components";
import { useFormik } from "formik";
import { database } from "../../../user";
import useLocalStorage from "../../../useLocalStorage";
import {
	FormControl,
	MenuItem,
	TextField,
	Select,
	InputLabel,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

function Account() {
	const [orderPopupRef, setOrderPopupRef] = useState();
	const [viewOrder, setViewOrder] = useState();
	const [user, setUser] = useLocalStorage("user", {});

	const { tab } = useParams();
	const history = useHistory();

	const tabs = {
		dashboard: (
			<>
				<h1>Dashboard</h1>
				<div className="tab__content"></div>
			</>
		),
		orders: (
			<>
				<h1>Orders</h1>
				<OrderPopup />
				<div className="tab__content">
					<div className="cards">
						<CounterCard title="Total" value={8} />
						<CounterCard title="Pending" value={0} />
						<CounterCard title="Completed" value={8} />
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
					<div className="order__tables">
						<OrderTable title="Completed Orders" />
						<hr
							style={{
								color: "#80808062",
								backgroundColor: "#80808062",
								height: 0.4,
								width: "100%",
								border: "none",
							}}
						/>
						<OrderTable title="Pending Orders" />
					</div>
				</div>
			</>
		),
		customizations: (
			<>
				<h1>Customizations</h1>
				<div className="tab__content"></div>
			</>
		),
		paymentInfo: (
			<>
				<h1>Payment Information</h1>
				<div className="tab__content">
					<div className="accountSettings__paymentInfo"></div>
				</div>
			</>
		),
		settings: (
			<>
				<h1>Account Settings</h1>
				<div className="tab__content">
					<div className="accountSettings__editInfo">
						<EditInfoForm />
					</div>
				</div>
			</>
		),
	};

	const [tabIndex, setTabIndex] = useState(0);
	// const [tabContent, setTabContent] = useState(tabs[tabIndex]);

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div className="account">
			<Header />
			<div className="account__main">
				<div className="account__left">
					<h2>{user.auth.displayName}</h2>
					<div className="tabs">
						<div
							className="account__tab"
							onClick={() =>
								history.push("/my-account/dashboard")
							}
						>
							Dashboard
						</div>
						<div
							className="account__tab"
							onClick={() => history.push("/my-account/orders")}
						>
							Orders
						</div>
						<div
							className="account__tab"
							onClick={() =>
								history.push("/my-account/customizations")
							}
						>
							Customizations
						</div>
						<div
							className="account__tab"
							onClick={() =>
								history.push("/my-account/paymentInfo")
							}
						>
							Payment Info
						</div>
						<div
							className="account__tab"
							onClick={() => history.push("/my-account/settings")}
						>
							Account Settings
						</div>
					</div>
				</div>
				<div className="account__right">
					<div className="tab">{tabs[tab]}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Account;

function Order({ popupRef }) {
	return (
		<div
			className="order"
			onClick={() => {
				if (popupRef)
					if (popupRef.current.classList.contains("hide")) {
						popupRef.current.classList.remove("hide");
						popupRef.current.classList.add("show");
					} else {
						popupRef.current.classList.remove("show");
						popupRef.current.classList.add("hide");
					}
			}}
		>
			<p className="order__invoiceNumber">1000</p>
			<h3 className="order__name">Qwer Tyu</h3>
			<p className="order__price">$ 440, 404</p>
			<p className="order__paid">$ 440, 404</p>
			<p className="order__outstandingBalance">$ 0</p>
			<p className="order__date">July 1, 2021</p>
		</div>
	);
}

function OrderPopup({ getPopupRef }) {
	const orderPopupRef = useRef();
	useEffect(() => {
		if (typeof getPopupRef === "function") getPopupRef(orderPopupRef);
		return () => {};
	}, []);

	return (
		<div className="orderPopUp hide" ref={orderPopupRef}>
			pop
		</div>
	);
}

function OrderTable({ title }) {
	const [tableData, setTableData] = useState(null);
	const [user, setUser] = useLocalStorage("user", {});

	useEffect(() => {
		async function fetchData() {
			try {
				if (title) {
					let snap = await database
						.collection("users")
						.doc(user.uid)
						.collection("orders")
						.where(
							title.toLowerCase().replace(" ", "_"),
							"==",
							true
						)
						.get();
					if (!snap.empty) {
						setTableData([...snap.docs]);
					} else {
						setTableData(null);
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		return () => {
			// setTableData(null);
		};
	}, [title, user.uid]);

	return (
		<div className="orderTable">
			<h2>{title || "Completed Orders"}</h2>
			<div className="orderTable__headings">
				<h4>Invoice #</h4>
				<h4>Description</h4>
				<h4>Price</h4>
				<h4>Paid</h4>
				<h4>Balance</h4>
				<h4>Order Date</h4>
			</div>
			<div className="table__data">
				<Order />
				<Order />
				<Order />
				<Order />
				{tableData ? (
					tableData.map((item, index) => (
						<Order order={item} key={index} />
					))
				) : (
					<h4>No Orders</h4>
				)}
			</div>
		</div>
	);
}

function CounterCard({ value, title }) {
	return (
		<div className="counterCard">
			<div className="counterCard__valueWrapper">
				<h1>{value || 0}</h1>
			</div>
			<h2>{title || "Card"} </h2>
		</div>
	);
}

function EditInfoForm() {
	const [user, setUser] = useLocalStorage("user", {});
	const formik = useFormik({
		initialValues: {
			firstName: user.data.firstName,
			lastName: user.data.lastName,
			dateOfBirth: user.data.dateOfBirth,
			gender: user.data.gender,
			street: user.data.address.street,
			state: user.data.address.state,
			country: user.data.address.country,
			zipCode: user.data.address.zipCode,
			email: user.auth.email,
			phoneNumber: user.data.phoneNumber,
		},
		initialErrors: {
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			gender: "",
			street: "",
			state: "",
			country: "",
			zipCode: "",
			email: "",
			phoneNumber: "",
		},
	});

	return (
		<form
			className="editInfo"
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					database
						.collection("users")
						.doc(user.auth.uid)
						.set(
							{
								firstName: formik.values.firstName,
								lastName: formik.values.lastName,
								gender: formik.values.gender,
								address: {
									street: formik.values.street,
									state: formik.values.state,
									country: formik.values.country,
									zipCode: formik.values.zipCode,
								},
								phoneNumber: formik.values.phoneNumber,
							},
							{ merge: true }
						)
						.then(() => {
							alert("Account Details Updated.");
						});
				} catch (error) {
					console.log(error);
				}
			}}
		>
			<div>
				<h3>General</h3>
				<TextField
					label="First Name"
					type="text"
					name="firstName"
					id="firstName"
					onBlur={formik.handleBlur}
					fullWidth={true}
					onChange={formik.handleChange}
					value={formik.values.firstName}
					disabled
				/>
				<TextField
					label="Last Name"
					type="text"
					name="lastName"
					id="lastName"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					value={formik.values.lastName}
					disabled
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
				<TextField
					label="Date of Birth"
					type="date"
					name="dateOfBirth"
					id="dateOfBirth"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					value={formik.values.dateOfBirth}
					disabled
				/>
			</div>
			<div>
				<h3>Address</h3>
				<TextField
					label="Street & P.O."
					type="text"
					name="street"
					id="street"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					required={true}
					value={formik.values.street}
				/>
				<TextField
					label="State/Parish"
					type="text"
					name="state"
					id="state"
					onBlur={formik.handleBlur}
					fullWidth={true}
					onChange={formik.handleChange}
					required={true}
					value={formik.values.state}
				/>
				<TextField
					label="Country"
					type="text"
					name="country"
					id="country"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					required={true}
					value={formik.values.country}
				/>
				<TextField
					label="Zip Code"
					type="text"
					name="zipCode"
					id="zipCode"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					value={formik.values.zipCode}
				/>
			</div>
			<div>
				<h3>Contact</h3>
				<TextField
					label="Email"
					type="email"
					name="email"
					id="email"
					onBlur={formik.handleBlur}
					fullWidth={true}
					onChange={formik.handleChange}
					value={formik.values.email}
					disabled
				/>
				<TextField
					label="Phone Number"
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					fullWidth={true}
					required={true}
					value={formik.values.phoneNumber}
				/>
			</div>
			<Button fullWidth type="submit">
				Update
			</Button>
		</form>
	);
}

export { Order, OrderPopup, OrderTable, CounterCard, EditInfoForm };
