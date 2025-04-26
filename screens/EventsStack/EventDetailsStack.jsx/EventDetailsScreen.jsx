import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import { eventsByLocation } from "@/data/events";

import Header from "@/components/Header";

const EventDetailsScreen = ({ navigation, route }) => {
	const { locationId, eventId } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			<Header variant="2" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.banner}>
					<Text>Event details screen</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default EventDetailsScreen;
