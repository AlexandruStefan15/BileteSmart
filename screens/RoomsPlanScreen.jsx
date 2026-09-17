import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched by locationId and eventId

//constants
import { Colors } from "@/constants/Colors";

//compoenents
import InteractivePlan from "@/components/InteractivePlan";
import Header from "@/components/Header";

export default RoomsPlanScreen = ({ navigation, route, ...props }) => {
	const { eventId, currentLocation } = route.params;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				variant="4"
				style={{ backgroundColor: Colors.tertiary }}
				title="Selecteaza sectorul"
				backButtonSize={25.5}
			/>
			<InteractivePlan
				rooms={roomsWithSeats[currentLocation.id][eventId].rooms}
				selectRoom={true}
				field={currentLocation.fieldSVG}
				style={{ marginTop: 60 }}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: { paddingBlock: 13 },
});
