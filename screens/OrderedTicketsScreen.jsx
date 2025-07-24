import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

//constants
import { Colors } from "@/constants";

//components
import Header from "@/components/Header";

const OrderedTicketsScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
				<Text>Ordered tickets list</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default OrderedTicketsScreen;
