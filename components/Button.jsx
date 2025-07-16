import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants";

export default function Button({ children, variant = "", style, styleText = {}, ...props }) {
	return (
		<TouchableOpacity style={[styles[`button${variant}`], style]} {...props}>
			<Text style={[styles[`buttonText${variant}`], styleText]}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingBlock: 15,
		paddingInline: 30,
		borderRadius: 30,
	},

	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
	},

	//variant 2

	button2: {
		padding: 10,
		backgroundColor: "#2196f3",
		borderRadius: 3,
		alignItems: "center",
	},

	buttonText2: {
		color: "white",
		fontWeight: "600",
		fontSize: 13.5,
		textTransform: "uppercase",
	},
});
