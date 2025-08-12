import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

const GalleryScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Text>Gallery screen</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GalleryScreen;
