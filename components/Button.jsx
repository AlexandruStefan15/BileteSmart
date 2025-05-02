import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants";

export default function Button({ children, variant = "", style, styleText, ...props }) {
	return (
		<TouchableOpacity style={[styles[`button${variant}`], style]} {...props}>
			<Text style={[styles.buttonText, styleText]}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 30,
		alignSelf: "center",
	},

	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
	},
});
