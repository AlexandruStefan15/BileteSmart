import { View, Text } from "react-native";
import React from "react";

export default function NewsLetter() {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>NewsLetter</Text>
			<View styles={styles.container}>
				<Text style={styles.innertitle}>NewsLetter</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	section: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: "#555",
	},
});
