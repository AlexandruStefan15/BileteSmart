import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({ children, variant = "", style, ...props }) => {
	return (
		<Text style={[styles[`title${variant}`], style]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 23,
		fontWeight: "bold",
		color: "#000",
		textAlign: "center",
		marginBlock: 20,
	},

	title2: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
		textAlign: "center",
		marginBlock: 10,
	},
});

export default Title;
