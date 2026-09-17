import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import { Colors } from "@/constants";

export default function Button({ children, variant = "", style, styleText = {}, iconRight, ...props }) {
	const styles = getStyles(variant);

	return (
		<TouchableOpacity style={[styles.button, style]} {...props}>
			<Text style={[styles.buttonText, styleText]}>{children}</Text>
			{iconRight}
		</TouchableOpacity>
	);
}

const getStyles = (variant) => {
	if (variant == "2")
		return StyleSheet.create({
			button: {
				padding: 10,
				backgroundColor: "#2196f3",
				borderRadius: 3,
				alignItems: "center",
			},
			buttonText: {
				color: "white",
				fontWeight: "600",
				fontSize: 13.5,
				textTransform: "uppercase",
			},
		});

	if (variant == "3")
		return StyleSheet.create({
			button: {
				backgroundColor: "#2196f3",
				paddingBlock: 10, // use paddingVertical / paddingHorizontal instead of block/inline
				paddingInline: 20,
				borderRadius: 6,
				alignItems: "center",
				flexDirection: "row",
				justifyContent: "center",
				gap: 5,
			},
			buttonText: {
				color: "white",
				fontWeight: "bold",
				fontSize: 15.5,
				textTransform: "uppercase",
				letterSpacing: 0.24,
			},
		});

	if (variant == "4")
		return StyleSheet.create({
			button: {
				backgroundColor: "#2196f3",
				paddingBlock: 16,
				paddingInline: 20,
				alignItems: "center",
				flexDirection: "row",
				justifyContent: "center",
				gap: 5,
				borderRadius: 12,
			},
			buttonText: {
				color: "white",
				fontWeight: "bold",
				fontSize: 15.5,
				textTransform: "uppercase",
				letterSpacing: 0.24,
			},
		});

	// default style
	return StyleSheet.create({
		button: {
			backgroundColor: Colors.primary,
			paddingVertical: 15,
			paddingHorizontal: 30,
			borderRadius: 30,
		},
		buttonText: {
			color: "white",
			fontSize: 18,
			textAlign: "center",
		},
	});
};
