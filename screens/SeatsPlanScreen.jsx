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
	const { roomId, rooms } = route.params;
	const currentRoom = rooms.find((room) => room.id_room == roomId);
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
				fieldPosition={currentRoom.field_position}
				style={{ marginTop: 45 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
