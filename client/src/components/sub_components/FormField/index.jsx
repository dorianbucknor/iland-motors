import React from "react";
import "./index.css";

function FormField({ name, label, error, ...rest }) {
	return (
		<div className="formField">
			<label className="formField__label" htmlFor={name}>
				{label}
			</label>
			<input
				className="formField__input"
				id={name}
				name={name}
				{...rest}
			/>
			<label className="formField__error">{error}</label>
		</div>
	);
}

export default FormField;
