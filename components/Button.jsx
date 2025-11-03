import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import { Colors } from "@/constants";
import Icon from "./Icon";

export default function Button({
	children,
	variant = "",
	style,
	styleText = {},
	iconRight,
	...props
}) {
	return (
		<TouchableOpacity style={[styles[`button${variant}`], style]} {...props}>
			<Text style={[styles[`buttonText${variant}`], styleText]}>{children}</Text>
			{iconRight}
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

	//variant 3
	button3: {
		backgroundColor: "#2196f3",
		paddingBlock: 10,
		borderRadius: 6,
		paddingInline: 0,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		gap: 5,
		alignSelf: "flex-start",
		paddingInline: 20,
	},

	buttonText3: {
		color: "white",
		fontWeight: 700,
		fontSize: 15,
		textTransform: "uppercase",
	},
});
