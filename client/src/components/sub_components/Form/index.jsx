import React, { useEffect, useRef, useState } from "react";
import "./index.css";

function Button({
	children,
	small,
	onClick,
	type,
	href,
	fullWidth,
	startIcon,
	endIcon,
	disabled,
	...rest
}) {
	return (
		<button
			onClick={onClick}
			type={type || "button"}
			href={href}
			className="button"
			style={{
				width: fullWidth ? "100%" : "max-content",
				height: "1.2rem",
				fontSize: small ? "0.7rem" : "0.8rem",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				gap: "0.4rem",
				cursor: "pointer",
			}}
			{...rest}
		>
			{startIcon}
			{children}
			{endIcon}
		</button>
	);
}

function TextInput({ label, onChange, onClick, onBlur, value, fullWidth }) {
	return (
		<div
			className="textInput"
			style={{ width: fullWidth ? "100%" : "6rem" }}
		>
			<label htmlFor="textInput">{label}</label>
			<input
				type="text"
				name="textInput"
				id="textInput"
				className="textInput"
				onChange={onChange}
				onBlur={onBlur}
				onClick={onClick}
				value={value}
			/>
		</div>
	);
}

function PasswordInput({ label, onChange, onClick, onBlur, value, fullWidth }) {
	return (
		<div
			className="passwordInput"
			style={{ width: fullWidth ? "100%" : "6rem" }}
		>
			<label htmlFor="passwordInput">{label}</label>
			<input
				type="password"
				name="passwordInput"
				id="passwordInput"
				className="passwordInput"
				onChange={onChange}
				onBlur={onBlur}
				onClick={onClick}
				value={value}
			/>
		</div>
	);
}

function Range({ min, max, getRange, gap }) {
	const minRef = useRef();
	const maxRef = useRef();
	const trackRef = useRef();

	const [minValue, setMinValue] = useState(min + min / 4);
	const [maxValue, setMaxValue] = useState(max / 2);
	const [percent1, setPercent1] = useState(minValue);
	const [percent2, setPercent2] = useState(maxValue);

	useEffect(() => {
		setPercent1((minValue / (max || 100)) * 100);
		setPercent2((maxValue / (max || 100)) * 100);

		if (typeof getRange === "function")
			getRange({ min: minValue, maxValue });

		return () => {};
	}, [max, maxValue, minValue]);

	return (
		<div className="range">
			<input
				type="number"
				value={minValue}
				onChange={(e) => {
					if (
						maxValue - parseInt(e.currentTarget.value) <=
						(gap || 0)
					) {
						setMinValue(maxValue - gap);
					} else {
						setMinValue(parseInt(e.currentTarget.value));
					}
				}}
			/>
			<div className="range__sliders">
				<div
					className="range__track"
					ref={trackRef}
					style={{
						background: `linear-gradient(to right, var(--accent-1) ${percent1}%, var(--primary-color) ${percent1}%, var(--primary-color) ${percent2}%, var(--accent-1) ${percent2}%)`,
					}}
				/>
				<input
					type="range"
					name="range-min"
					id="range-min"
					min={min || 0}
					max={max || 100}
					ref={minRef}
					value={minValue}
					onInput={(e) => {
						if (
							maxValue - parseInt(e.currentTarget.value) <=
							(gap || 0)
						) {
							setMinValue(maxValue - (gap || 0));
						} else {
							setMinValue(parseInt(e.currentTarget.value));
						}
					}}
				/>
				<input
					ref={maxRef}
					type="range"
					name="range-max"
					min={min || 0}
					value={maxValue}
					id="range-max"
					max={max || 100}
					onInput={(e) => {
						if (
							parseInt(e.currentTarget.value) - minValue <=
							(gap || 0)
						) {
							setMaxValue(minValue + (gap || 0));
						} else {
							setMaxValue(parseInt(e.currentTarget.value));
						}
					}}
				/>
			</div>
			<input
				type="number"
				value={maxValue}
				onChange={(e) => {
					if (
						parseInt(e.currentTarget.value) - minValue <=
						(gap || 0)
					) {
						setMaxValue(minValue + gap);
					} else {
						setMaxValue(parseInt(e.currentTarget.value));
					}
				}}
			/>
		</div>
	);
}

export { Button, TextInput, PasswordInput, Range };
