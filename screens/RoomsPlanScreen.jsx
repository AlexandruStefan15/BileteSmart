import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";

export default RoomsPlanScreen = ({ navigation, route }) => {
	const { locationId, eventId, locationFieldPath } = route.params;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SvgHallPlan
				roomsWithSeatsData={roomsWithSeats[1][129].rooms}
				field_path={locationFieldPath}
				height="100%"
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
