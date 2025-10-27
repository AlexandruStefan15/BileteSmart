import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched by locationId and eventId

//store
import { useCartSidebarStore } from "@/store/store";

//constants
import { Colors } from "@/constants/Colors";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

export default RoomsPlanScreen = ({ navigation, route, ...props }) => {
	const { locationId, eventId, currentLocation } = route.params;
	const { sidebarX } = useCartSidebarStore();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				variant="2"
				style={{ backgroundColor: Colors.tertiary }}
				showCart={true}
				seatCount={props.seatCount}
				badgeStyle={props.badgeStyle}
				displayBadge={props.displayBadge}
				backButtonSize={25.5}
			/>
			<SvgHallPlan
				rooms={roomsWithSeats[locationId][eventId].rooms}
				selectRoom={true}
				field={currentLocation.fieldSVG}
				style={{ marginTop: 60 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});
