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
	const styles = getStyles(variant);

	return (
		<TouchableOpacity style={[styles.button, style]} {...props}>
			<Text style={[styles.buttonText, styleText]}>{children}</Text>
			{iconRight}
		</TouchableOpacity>
	);
}

const getStyles = (variant) => {
	// variant 2
	if (variant === "2")
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

	// variant 3
	if (variant === "3")
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
				fontWeight: "700",
				fontSize: 15,
				textTransform: "uppercase",
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
