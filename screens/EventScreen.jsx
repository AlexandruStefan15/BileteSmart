import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import Header from "@/components/Header";

const EventScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Home" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Event screen</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default EventScreen;
