import React from "react";
import { Text, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import * as Haptics from "expo-haptics";

const RippleButton = () => {
	return (
		<Ripple
			style={styles.button}
			rippleColor="white"
			rippleDuration={400}
			rippleCentered={false}
			onPress={() => {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				console.log("Pressed!");
			}}
		>
			<Text style={styles.text}>Tap me</Text>
		</Ripple>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#007AFF",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default RippleButton;
