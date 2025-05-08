import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

export default RoomsPlanScreen = ({ navigation, route }) => {
	const { roomId } = route.params;
	const currentRoom = roomsWithSeats[1][129].rooms.find((room) => room.id_room == roomId);
	const seats = currentRoom.seats;
	const rows = currentRoom.rows_path_d;
	const currentRoom_fieldPosition = currentRoom.field_position;

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header variant="3" />
			<SvgHallPlan
				seats={seats}
				rows={rows}
				selectSeats={true}
				height="100%"
				style={{ marginTop: 60 }}
				fieldPosition={currentRoom_fieldPosition}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
