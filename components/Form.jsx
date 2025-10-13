// Form.js
import React, { createContext, useContext, useState, useCallback } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

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
	};

	return (
		<FormContext.Provider value={{ values, errors, setErrors, handleChange }}>
			<View style={[styles.form, style]}>{children}</View>
			<Form.SubmitButton onPress={handleSubmit} />
		</FormContext.Provider>
	);
};

Form.Field = ({ name, placeholder, validate, secureTextEntry = false, style, ...props }) => {
	const { values, errors, handleChange, setErrors } = useFormContext();

	const onChangeText = (text) => {
		handleChange(name, text);
		if (validate) {
			const err = validate(text);
			setErrors((prev) => ({ ...prev, [name]: err }));
		}
	};

	return (
		<View style={styles.field}>
			<TextInput
				value={values[name] || ""}
				onChangeText={onChangeText}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				style={[styles.input, errors[name] && styles.inputError, style]}
				placeholderTextColor="#888"
			/>
			{errors[name] && <Text style={styles.error}>{errors[name]}</Text>}
		</View>
	);
};

// Submit button (compound child)
Form.SubmitButton = ({ title = "Submit", onPress, style, ...props }) => (
	<TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
		<Text style={styles.buttonText}>{title}</Text>
	</TouchableOpacity>
);

export default Form;

// Styles
const styles = StyleSheet.create({
	form: {
		gap: 12,
	},
	field: {
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: "#000",
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
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
