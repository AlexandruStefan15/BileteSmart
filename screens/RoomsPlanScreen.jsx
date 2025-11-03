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
import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default RoomsPlanScreen = ({ navigation, route, closeBottomSheet, ...props }) => {
	const { eventId, currentLocation } = route.params;
	const { sidebarX, openSidebar } = useCartSidebarStore();
	const { height: screenHeight } = Dimensions.get("screen");

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
			<BottomSheet
				activeHeight={screenHeight * 0.2}
				backgroundColor={"#2e2e2eff"}
				backDropColor={"black"}
				sharedTopAnimation={props.sharedTopAnimation}
			>
				<View style={styles.buttonsContainer}>
					<Button
						style={{ marginInline: "auto", paddingInline: 62 }}
						variant="3"
						onPress={openSidebar}
						iconRight={<Icon lib="io" name="cart-outline" size={23} color={"white"} />}
					>
						Vezi cosul
					</Button>
				</View>
			</BottomSheet>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: { paddingBlock: 13 },
});
