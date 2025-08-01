import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//store
import { useCartSidebarStore } from "@/store/store";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

export default SeatsPlanScreen = ({ navigation, route, ...props }) => {
	const { roomId } = route.params;
	const currentRoom = roomsWithSeats[1][129].rooms.find((room) => room.id_room == roomId);
	const currentRoom_fieldPosition = currentRoom.field_position;
	const { sidebarX } = useCartSidebarStore();

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header
				variant="3"
				showCart={true}
				seatCount={props.seatCount}
				badgeStyle={props.badgeStyle}
				displayBadge={props.displayBadge}
				openSidebar={props.openSidebar}
			/>
			<SvgHallPlan
				currentRoom={currentRoom}
				selectSeats={true}
				fieldPosition={currentRoom_fieldPosition}
				style={{ marginTop: 50 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
