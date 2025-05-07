import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

export default RoomsPlanScreen = ({ navigation, route }) => {
	const { roomId } = route.params;
	const currentRoom = roomsWithSeats[1][129].rooms.find((room) => room.id === roomId);
	const seats = room.seats;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header variant="3" />
			<SvgHallPlan
				roomsWithSeatsData={roomsWithSeats[1][129].rooms}
				selectSeats={true}
				height="100%"
				style={{ marginTop: 60 }}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
