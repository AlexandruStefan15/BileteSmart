import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Text>Contact Screen</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default ContactScreen;
