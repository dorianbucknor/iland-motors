import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Header, Footer } from "../../sub_components";
import { useFormik } from "formik";
import { database } from "../../../user";
import useLocalStorage from "../../../useLocalStorage";

function Account() {
	const [orderPopupRef, setOrderPopupRef] = useState();
	const [viewOrder, setViewOrder] = useState();
	const tabs = [
		<>
			<h1>Dashboard</h1>
			<div className="tab__content"></div>
		</>,
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
		</>,
		<>
			<h1>Customizations</h1>
			<div className="tab__content"></div>
		</>,
		<>
			<h1>Account Settings</h1>
			<div className="tab__content">
				<div className="accountSettings__editInfo">
					<EditInfoForm />
				</div>
			</div>
		</>,
	];

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
					<div className="tabs">
						<div
							className="account__tab"
							onClick={() => setTabIndex(0)}
						>
							Dashboard
						</div>
						<div
							className="account__tab"
							onClick={() => setTabIndex(1)}
						>
							Orders
						</div>
						<div
							className="account__tab"
							onClick={() => setTabIndex(2)}
						>
							Customizations
						</div>
						{/* <div className="account__tab"></div> */}
						<div
							className="account__tab"
							onClick={() => setTabIndex(3)}
						>
							Account Settings
						</div>
					</div>
				</div>
				<div className="account__right">
					<div className="tab">{tabs[tabIndex]}</div>
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
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			dateOfBirth: "01/01/2001",
			gender: "",
			street: "",
			state: "",
			country: "",
			zipCode: "",
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
		},
	});
	return (
		<form
			className="editInfo"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input
				type="text"
				name="firstName"
				id="firstName"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.firstName}
			/>
			<input
				type="text"
				name="lastName"
				id="lastName"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.lastName}
			/>
			<input
				type="text"
				name="street"
				id="street"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.street}
			/>
			<input
				type="text"
				name="state"
				id="state"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.state}
			/>
			<input
				type="text"
				name="country"
				id="country"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.country}
			/>
			<input
				type="text"
				name="zipCode"
				id="zipCode"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.zipCode}
			/>
		</form>
	);
}

export { Order, OrderPopup, OrderTable, CounterCard, EditInfoForm };
