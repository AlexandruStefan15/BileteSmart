import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import { ticketingData } from "@/data/ticketing";

//components
import Header from "@/components/Header";

const TicketingScreen = () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Ticketing"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
			>
				<View style={[styles.section, storyStyles.section]}>
					<View style={storyStyles.container}>
						<Text style={storyStyles.title}>{ticketingData.title}</Text>
						<Text style={storyStyles.story}>{ticketingData.story}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

const storyStyles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
});

export default TicketingScreen;
