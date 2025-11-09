import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//constants
import { Colors } from "@/constants/Colors";
import SeeTheCartPanel from "@/components/SeeTheCartPanel";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

const SeatsPlanScreen = ({ navigation, route, ...props }) => {
	const { roomId, rooms } = route.params;
	const currentRoom = rooms.find((room) => room.id_room == roomId);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header variant="2" style={{ backgroundColor: Colors.tertiary }} backButtonSize={25.5} />
			<SvgHallPlan
				currentRoom={currentRoom}
				selectSeats={true}
				fieldPosition={currentRoom.field_position}
				style={{ marginTop: 45 }}
			/>
			<SeeTheCartPanel sidebarX={props.sidebarX} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default SeatsPlanScreen;
