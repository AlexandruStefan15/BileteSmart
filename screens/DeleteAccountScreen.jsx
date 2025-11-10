import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Header from "@/components/Header";

const DeleteAccountScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Sterge contul"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Text>Delete account screen</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default DeleteAccountScreen;
