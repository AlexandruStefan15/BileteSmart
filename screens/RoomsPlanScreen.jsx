import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched by locationId and eventId

//store
import { useCartSidebarStore } from "@/store";

//constants
import { Colors } from "@/constants/Colors";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import SeeTheCartBottomSheet from "@/components/SeeTheCartBottomSheet";

export default RoomsPlanScreen = ({ navigation, route, closeBottomSheet, ...props }) => {
	const { eventId, currentLocation } = route.params;
	const { sidebarX } = useCartSidebarStore();

	useEffect(() => {
		return () => {
			closeBottomSheet?.();
		};
	}, [closeBottomSheet]);

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
				rooms={roomsWithSeats[currentLocation.id][eventId].rooms}
				selectRoom={true}
				field={currentLocation.fieldSVG}
				style={{ marginTop: 60 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
			<SeeTheCartBottomSheet sharedTopAnimation={props.sharedTopAnimation} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: { paddingBlock: 13 },
});
