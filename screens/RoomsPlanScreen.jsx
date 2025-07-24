import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched by locationId and eventId

//store
import { useCartSidebarStore } from "@/store/store";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

export default RoomsPlanScreen = ({ navigation, route, ...props }) => {
	const { locationId, eventId, locationFieldPath } = route.params;
	const { sidebarX } = useCartSidebarStore();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				variant="3"
				showCart={true}
				seatCount={props.seatCount}
				badgeStyle={props.badgeStyle}
				displayBadge={props.displayBadge}
			/>
			<SvgHallPlan
				rooms={roomsWithSeats[1][129].rooms}
				selectRoom={true}
				field_path={locationFieldPath}
				height="100%"
				style={{ marginTop: 60 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
