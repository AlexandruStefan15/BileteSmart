import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import { Colors } from "@/constants";

import Header from "@/components/Header";

const LocationScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header variant="2" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Location screen</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},
});

export default LocationScreen;
