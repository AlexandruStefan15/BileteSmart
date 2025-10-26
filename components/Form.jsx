// Form.js
import React, { createContext, useContext, useState } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Dimensions,
} from "react-native";

//components
import Input from "./Input";

//context
import { FormContext, useFormContext } from "@/context/FormContext";

const Form = ({ initialValues = {}, onSubmit, children, style, ...props }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const screenWidth = Dimensions.get("window").width;
	const styles = getStyles(screenWidth);

	const handleChange = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		const hasErrors = Object.values(errors).some((e) => e != "");
		if (!hasErrors && onSubmit) onSubmit(values);
		else Alert.alert("Eroare", "Va rugam sa revizuiti formularul si sa corectati erorile.");
	};

	return (
		<FormContext.Provider value={{ values, errors, setErrors, handleChange, handleSubmit, styles }}>
			<View style={[styles.form, style]} {...props}>
				{children}
			</View>
		</FormContext.Provider>
	);
};

Form.Field = ({ style, children, ...props }) => {
	const { errors, styles } = useFormContext();

	return (
		<View style={styles.field} {...props}>
			{children}
		</View>
	);
};

Form.Label = ({ children, style, ...props }) => {
	const { styles } = useFormContext();
	return (
		<Text style={[styles.label, style]} {...props}>
			{children}
		</Text>
	);
};

Form.Input = ({ name, validate, ...props }) => {
	const { values, handleChange, setErrors, styles } = useFormContext();

	const onChangeText = (text) => {
		handleChange(name, text);
		if (validate) {
			const err = validate(text, values);
			setErrors((prev) => ({ ...prev, [name]: err || "" }));
		}
	};

	return (
		<Input
			value={values[name] || ""}
			onChangeText={onChangeText}
			inputStyle={styles.input}
			{...props}
		/>
	);
};

Form.Error = ({ name, style, ...props }) => {
	const { errors, styles } = useFormContext();
	if (!errors[name]) return null;
	return (
		<Text style={[styles.error, style]} {...props}>
			{errors[name]}
		</Text>
	);
};

// Submit button (compound child)
Form.SubmitButton = ({ title = "Submit", style, ...props }) => {
	const { handleSubmit, styles } = useFormContext();

	return (
		<TouchableOpacity style={[styles.button, style]} onPress={handleSubmit} {...props}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Form;

// Styles
const getStyles = (screenWidth) =>
	StyleSheet.create({
		form: {
			padding: 24,
			gap: 16,
			width: screenWidth - 20,
		},

		field: {
			gap: 6,
		},

		label: {
			fontSize: 15,
			color: "#232323ff",
			fontWeight: "500",
			marginLeft: 1,
		},

		input: {},

		inputError: {
			borderColor: "#e63946",
		},

		error: {
			color: "#e63946",
			marginTop: 4,
			fontSize: 13,
		},

		button: {
			backgroundColor: "#305a82",
			paddingVertical: 14,
			borderRadius: 8,
			alignItems: "center",
		},

		buttonText: {
			color: "#fff",
			fontWeight: "600",
			fontSize: 16,
		},
	});

export const validation = {
	requiredInput: (text) => (!text ? "Campul este obligatoriu" : ""),
	phoneNr: (text) => {
		if (!text.trim()) return "Campul este obligatoriu.";
		if (text && !/^\d{10,15}$/.test(text)) return "Numarul de telefon nu este valid.";
	},
	email: (text) => {
		if (!text.trim()) return "Campul este obligatoriu.";
		if (text && !/\S+@\S+\.\S+/.test(text)) return "Emailul nu este valid";
	},
	matchEmail: (text, values) => text !== values.email && "Emailurile nu coincid", // values.email NOT values.Email
};
