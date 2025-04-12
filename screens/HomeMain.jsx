import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants";

export default function HomeMain({ navigation }) {
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Header title="Home" />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},
});
