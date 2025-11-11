// Form.js
import React, { createContext, useContext, useState, useEffect } from "react";
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

export const validation = {
	required: (text) => (!text ? "Campul este obligatoriu" : ""),
	phoneNr_required: (text) => {
		if (!text.trim()) return "Campul este obligatoriu.";
		if (text && !/^\d{10,15}$/.test(text)) return "Numarul de telefon nu este valid.";
	},
	email_required: (text) => {
		if (!text.trim()) return "Campul este obligatoriu.";
		if (text && !/\S+@\S+\.\S+/.test(text)) return "Emailul nu este valid";
	},
	matchEmail: (text, values) => text !== values.email && "Emailurile nu coincid", // values.email NOT values.Email
};

const Form = ({ initialValues = {}, onSubmit, children, style, ...props }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [initialErrors, setInitialErrors] = useState({});
	const screenWidth = Dimensions.get("window").width;
	const styles = getStyles(screenWidth);

	const handleChange = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		const hasErrors = Object.values(errors).some((e) => e != "");
		const hasInitialErrors = Object.values(initialErrors).some((e) => e != "");
		if (hasInitialErrors) {
			setErrors((prev) => ({ ...prev, ...initialErrors }));
			Alert.alert("Eroare", "Va rugam sa revizuiti formularul si sa corectati erorile.");
			return;
		}
		if (!hasErrors && onSubmit) onSubmit(values);
		else Alert.alert("Eroare", "Va rugam sa revizuiti formularul si sa corectati erorile.");
	};

	return (
		<FormContext.Provider
			value={{ values, errors, setErrors, setInitialErrors, handleChange, handleSubmit, styles }}
		>
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
	const { values, handleChange, setErrors, setInitialErrors, styles } = useFormContext();

	const onChangeText = (text) => {
		handleChange(name, text);
		if (validate) {
			const err = validate(text, values);
			setErrors((prev) => ({ ...prev, [name]: err || "" }));
			setInitialErrors((prev) => ({ ...prev, [name]: err || "" }));
		}
	};

	useEffect(() => {
		if (validate) {
			const err = validate(values[name], values);
			setInitialErrors((prev) => ({ ...prev, [name]: err || "" }));
		}
	}, []);

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
		<TouchableOpacity style={[styles.submitButton, style]} onPress={handleSubmit} {...props}>
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

		submitButton: {
			backgroundColor: "#305a82",
			paddingVertical: 15,
			borderRadius: 8,
			alignItems: "center",
		},

		buttonText: {
			color: "#fff",
			fontWeight: "600",
			fontSize: 16,
		},
	});
