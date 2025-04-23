import React from "react";
import { Text, StyleSheet } from "react-native";

const BoldText = ({ children, style, ...props }) => {
	return (
		<Text style={[styles.bold, style]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	bold: {
		fontWeight: "bold",
	},
});

export default BoldText;
