import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { images } from "@/assets/images";

const { height: windowHeight } = Dimensions.get("window");

export default function EventCounters() {
	return (
		<View style={styles.container}>
			<Image source={images.drummer} style={styles.backgroundImage} />
			<StatItem number="598" label="EVENIMENTE ORGANIZATE" />
			<StatItem number="16,173" label="CLIENTI MULTUMITI" />
			<StatItem number="15,000" label="LOCURI DISPONIBILE" />
		</View>
	);
}

function StatItem({ number, label }) {
	return (
		<View style={styles.statItem}>
			<Text style={styles.number}>{number}</Text>
			<View style={styles.separator} />
			<Text style={styles.label}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "#242424cc",
		height: windowHeight - 130,
		alignItems: "center",
		justifyContent: "center",
		gap: 30,
	},

	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		zIndex: -1,
	},

	statItem: {
		alignItems: "center",
		gap: 15,
	},

	number: {
		fontSize: 44,
		fontWeight: "bold",
		color: "#ffffff",
	},

	separator: {
		width: 40,
		height: 2,
		backgroundColor: "#ffffff",
		marginVertical: 8,
	},

	label: {
		fontSize: 19,
		fontWeight: "600",
		color: "#ffffff",
		textTransform: "uppercase",
	},
});
