import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

export default SeatsPlanScreen = ({
	navigation,
	route,
	selectedSeats,
	setSelectedSeats,
	seatCount,
	badgeStyle,
}) => {
	const { roomId } = route.params;
	const currentRoom = roomsWithSeats[1][129].rooms.find((room) => room.id_room == roomId);
	const currentRoom_fieldPosition = currentRoom.field_position;

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header
				variant="3"
				showCart={true}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
				seatCount={seatCount}
				badgeStyle={badgeStyle}
			/>
			<SvgHallPlan
				currentRoom={currentRoom}
				selectSeats={true}
				height="100%"
				style={{ marginTop: 60 }}
				fieldPosition={currentRoom_fieldPosition}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
