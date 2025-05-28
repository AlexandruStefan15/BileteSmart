import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

export default function CheckoutForm({ onSubmit }) {
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [phoneNr, setPhoneNr] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};
		if (!lastName.trim()) newErrors.lastName = "Numele este obligatoriu";
		if (!firstName.trim()) newErrors.firstName = "Prenumele este obligatoriu";
		if (!phoneNr.trim()) newErrors.lastName = "Numarul de telefon este obligatoriu";
		if (!email.trim()) newErrors.email = "Emailul este obligatoriu";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		try {
			const response = await fetch("https://your-api.com/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ lastName, firstName, phoneNr, email }),
			});

			const data = await response.json();

			if (response.ok) {
				Alert.alert("Success", data.message || "Message sent successfully!");
				setLastName("");
				setFirstName("");
				setPhoneNr("");
				setEmail("");
				setErrors({});
				onSubmit?.({ lastName, firstName, phoneNr, email });
			} else {
				Alert.alert("Error", data.error || "Something went wrong.");
			}
		} catch (err) {
			console.error(err);
			Alert.alert("Network Error", "Failed to send message.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Nume</Text>
			<TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="" />
			{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

			<Text style={styles.label}>Prenume</Text>
			<TextInput
				style={styles.input}
				value={firstName}
				onChangeText={setFirstName}
				placeholder=""
			/>
			{errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

			<Text style={styles.label}>Telefon</Text>
			<TextInput
				style={[styles.input, { height: 100 }]}
				value={phoneNr}
				onChangeText={setPhoneNr}
				placeholder=""
				keyboardType="number-pad"
			/>
			{errors.phoneNr && <Text style={styles.error}>{errors.phoneNr}</Text>}

			<Text style={styles.label}>Email</Text>
			<TextInput
				style={styles.input}
				value={email}
				onChangeText={setEmail}
				placeholder=""
				keyboardType="email-address"
			/>
			{errors.email && <Text style={styles.error}>{errors.email}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
});
