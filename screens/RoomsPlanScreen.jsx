import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched by locationId and eventId

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

export default RoomsPlanScreen = ({
	navigation,
	route,
	selectedSeats,
	setSelectedSeats,
	seatCount,
	badgeStyle,
}) => {
	const { locationId, eventId, locationFieldPath } = route.params;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				variant="3"
				showCart={true}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
				seatCount={seatCount}
				badgeStyle={badgeStyle}
			/>
			<SvgHallPlan
				rooms={roomsWithSeats[1][129].rooms}
				selectRoom={true}
				field_path={locationFieldPath}
				height="100%"
				style={{ marginTop: 60 }}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
