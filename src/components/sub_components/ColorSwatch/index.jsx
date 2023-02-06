import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Button } from "..";

function ColorSwatch({
	id,
	name,
	value,
	onClick,
	onBlur,
	inputProps,
	colors,
	hasAccent,
	onChange,
	selectedSwatch,
	swatchName,
}) {
	const [currentColors, setCurrentColors] = useState(colors || []);
	const [swatchColors, setSwatchColors] = useState(colors?.join("-") || " ");

	useEffect(() => {
		// if (currentColors !== colors) setCurrentColors(colors);

		if (selectedSwatch?.name === swatchName) {
			onChange(swatchName, currentColors?.join("-"));
		}
		return () => {};
	}, [swatchName, selectedSwatch, colors, onChange, currentColors]);
	return (
		<div
			className="colorSwatch"
			onClick={(e) => {
				if (typeof onClick === "function") {
					onClick(e);
				}
				onChange(swatchName, currentColors?.join("-"));
			}}
		>
			<div className="colorSwatch__colors">
				<div
					className="colorPrimary"
					style={{
						backgroundColor: colors ? currentColors[0] : "cyan",
					}}
				/>
				<div
					className="colorAccent"
					style={{
						backgroundColor: colors ? currentColors[1] : "pink",
					}}
				/>
				<div
					className="colorSecondary"
					style={{
						backgroundColor: colors ? currentColors[2] : "black",
					}}
				/>
			</div>

			{selectedSwatch?.name === swatchName ? (
				<Button
					onClick={() => {
						let tempArray = currentColors.splice(
							0,
							currentColors.length
						);
						tempArray.push(tempArray.shift());
						setCurrentColors(tempArray);
						onChange(swatchName, tempArray.join("-"));
					}}
					small={true}
				>
					Rotate Colors
				</Button>
			) : null}
		</div>
	);
}

export default ColorSwatch;

export function ColorSwatchGroup({ children, selectedValue }) {
	const colorGroupRef = useRef();
	const [selectedSwatch, setSelectedSwatch] = useState({
		name: "swatch1",
		value: "gold-black",
	});

	const handleChange = (swatchName, value) => {
		if (
			selectedSwatch?.name !== swatchName ||
			selectedSwatch?.value !== value
		) {
			setSelectedSwatch({ name: swatchName, value });
			selectedValue({ name: swatchName, value });
		}
	};
	return (
		<div className="colorSwatchGroup">
			{children({
				colorGroupRef,
				selectedSwatch,
				handleChange,
			})}
		</div>
	);
}

export function CustomizeOption({
	value,
	onClick,
	onBlur,
	picture,
	selectedValue,
	onChange,
}) {
	return (
		<div
			className={
				selectedValue.toLowerCase() === value.toLowerCase()
					? "customizeOption selectedValue"
					: "customizeOption "
			}
			onClick={() => onChange(value)}
		>
			<img src={picture || " "} alt="" />
			<p>{value}</p>
		</div>
	);
}

export function CustomizeSelect({ children, getSelected }) {
	const [selected, setSelected] = useState("option");

	const handleChange = (newValue) => {
		setSelected(newValue);
		if (typeof getSelected === "function") getSelected(newValue);
	};

	const childProps = {
		selectedValue: selected,
		handleChange: handleChange,
	};
	return <div className="customizeSelect">{children(childProps)}</div>;
}
