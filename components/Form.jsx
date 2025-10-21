// Form.js
import React, { createContext, useContext, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

//components
import Input from "./Input";

// Create context
const FormContext = createContext(null);

const useFormContext = () => {
	const ctx = useContext(FormContext);
	if (!ctx) throw new Error("Form compound components must be used within <Form>");
	return ctx;
};

const Form = ({ initialValues = {}, onSubmit, children, style, ...props }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		const hasErrors = Object.values(errors).some((e) => e != "");
		if (!hasErrors && onSubmit) onSubmit(values);
		else Alert.alert("Eroare", "Va rugam sa revizuiti formularul si sa corectati erorile.");
	};

	return (
		<FormContext.Provider value={{ values, errors, setErrors, handleChange, handleSubmit }}>
			<View style={[styles.form, style]} {...props}>
				{children}
			</View>
		</FormContext.Provider>
	);
};

Form.Field = ({ style, children, ...props }) => {
	const { errors } = useFormContext();

	return (
		<View style={styles.field} {...props}>
			{children}
		</View>
	);
};

Form.Input = ({ name, validate, ...props }) => {
	const { values, handleChange, setErrors } = useFormContext();

	const onChangeText = (text) => {
		handleChange(name, text);
		if (validate) {
			const err = validate(text);
			setErrors((prev) => ({ ...prev, [name]: err }));
		}
	};

	return <Input value={values[name] || ""} onChangeText={onChangeText} {...props} />;
};

Form.Error = ({ name, style, ...props }) => {
	const { errors } = useFormContext();
	if (!errors[name]) return null;
	return (
		<Text style={[styles.error, style]} {...props}>
			{errors[name]}
		</Text>
	);
};

// Submit button (compound child)
Form.SubmitButton = ({ title = "Submit", style, ...props }) => {
	const { handleSubmit } = useFormContext();

	return (
		<TouchableOpacity style={[styles.button, style]} onPress={handleSubmit} {...props}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Form;

// Styles
const styles = StyleSheet.create({
	form: {
		padding: 25,
		gap: 10,
	},
	field: {
		marginBottom: 10,
	},
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
