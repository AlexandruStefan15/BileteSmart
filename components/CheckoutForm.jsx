import React, { useState, forwardRef, useImperativeHandle, use } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Checkbox from "react-native-bouncy-checkbox";

//store
import { useSelectedSeats } from "@/store/store";

const CheckoutForm = forwardRef(({ onSubmit, style }, ref) => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [phoneNr, setPhoneNr] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [errors, setErrors] = useState({});
	const [localChecked, setLocalChecked] = useState(false);

	const validate = () => {
		const newErrors = {};
		if (!lastName.trim()) newErrors.lastName = "Numele este obligatoriu";
		if (!firstName.trim()) newErrors.firstName = "Prenumele este obligatoriu";
		if (!phoneNr.trim()) newErrors.phoneNr = "Numarul de telefon este obligatoriu";
		if (!email.trim()) newErrors.email = "Emailul este obligatoriu";
		if (!confirmEmail.trim()) newErrors.confirmEmail = "Confirmarea emailului este obligatorie";
		if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Emailul nu este valid";
		if (email !== confirmEmail) newErrors.confirmEmail = "Emailurile nu se potrivesc";
		if (!localChecked) newErrors.terms = "Trebuie sa accepti termenii si conditiile";
		if (phoneNr && !/^\d{10,15}$/.test(phoneNr)) {
			newErrors.phoneNr = "Numarul de telefon trebuie sa contina minim 10 cifre";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) {
			Alert.alert("Eroare", "Va rugam sa revizuiti formularul si sa corectati erorile.");
			return;
		}

		Alert.alert("Success", "Form submitted successfully!");

		/* try {
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
				setConfirmEmail("");
				setErrors({});
				setLocalChecked(false);
				onSubmit?.({ lastName, firstName, phoneNr, email, selectedSeats });
			} else {
				Alert.alert("Error", data.error || "Something went wrong.");
			}
		} catch (err) {
			console.error(err);
			Alert.alert("Network Error", "Failed to send message.");
		} */
	};

	useImperativeHandle(ref, () => ({ submit: handleSubmit }));

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.formTitle}>Informatii Personale</Text>

			<Text style={styles.label}>Nume</Text>
			<TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
			{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

			<Text style={styles.label}>Prenume</Text>
			<TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
			{errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

			<Text style={styles.label}>Telefon</Text>
			<TextInput
				style={styles.input}
				value={phoneNr}
				onChangeText={setPhoneNr}
				keyboardType="number-pad"
			/>
			{errors.phoneNr && <Text style={styles.error}>{errors.phoneNr}</Text>}

			<Text style={styles.label}>Email</Text>
			<TextInput
				style={styles.input}
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>
			{errors.email && <Text style={styles.error}>{errors.email}</Text>}

			<Text style={styles.label}>Confirma email</Text>
			<TextInput
				style={styles.input}
				value={confirmEmail}
				onChangeText={setConfirmEmail}
				keyboardType="email-address"
			/>
			{errors.confirmEmail && <Text style={styles.error}>{errors.confirmEmail}</Text>}

			<View style={styles.termsAndConditions}>
				<Checkbox
					isChecked={localChecked}
					disableText
					fillColor="black"
					size={19}
					useBuiltInState={false}
					iconImageStyle={styles.iconImageStyle}
					innerIconStyle={{ borderRadius: 3 }}
					iconStyle={{ borderRadius: 3 }}
					onPress={() => setLocalChecked(!localChecked)}
				/>
				<View style={{ flexDirection: "row", flexShrink: 1 }}>
					<Text onPress={() => setLocalChecked(!localChecked)} style={styles.label}>
						Sunt de acord cu{" "}
					</Text>
					<TouchableOpacity>
						<Text style={[styles.label, { color: "#23527c" }]}>termenii si Conditiile.</Text>
					</TouchableOpacity>
				</View>
			</View>

			{errors.terms && <Text style={styles.error}>{errors.terms}</Text>}
		</View>
	);
});

export default CheckoutForm;

const styles = StyleSheet.create({
	container: {
		padding: 21,
		paddingRight: 25,
		backgroundColor: "white",
	},

	formTitle: {
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 20,
	},

	label: {
		fontSize: 15,
		fontWeight: "500",
		marginTop: 5,
		marginBottom: 5,
		flexShrink: 1,
	},

	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		backgroundColor: "white",
	},
	error: {
		color: "red",
		marginBottom: 10,
	},

	//terms and conditions

	termsAndConditions: {
		marginTop: 5,
		flexDirection: "row",
		gap: 10,

		alignItems: "center",
	},
});
