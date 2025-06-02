import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSideBar, { useCartSideBar } from "@/components/CartSideBar";

export default SeatsPlanScreen = ({ route, seatCount, ...props }) => {
	const { roomId } = route.params;
	const currentRoom = roomsWithSeats[1][129].rooms.find((room) => room.id_room == roomId);
	const currentRoom_fieldPosition = currentRoom.field_position;

	const { sidebarX, open, close } = useCartSideBar();

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header
				variant="3"
				showCart={true}
				seatCount={props.seatCount}
				/* badgeStyle={props.badgeStyle}
				displayBadge={props.displayBadge} */
			/>
			<SvgHallPlan
				currentRoom={currentRoom}
				selectSeats={true}
				height="100%"
				style={{ marginTop: 64 }}
				fieldPosition={currentRoom_fieldPosition}
				openCart={open}
			/>
			<CartSideBar sidebarX={sidebarX} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
