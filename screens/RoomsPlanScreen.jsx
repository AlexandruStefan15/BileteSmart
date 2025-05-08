import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

export default RoomsPlanScreen = ({ navigation, route }) => {
	const { locationId, eventId, locationFieldPath } = route.params;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header variant="3" />
			<SvgHallPlan
				rooms={roomsWithSeats[1][129].rooms}
				selectRoom={true}
				field_path={locationFieldPath}
				height="100%"
				style={{ marginTop: 60 }}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
