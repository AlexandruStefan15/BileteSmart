import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated";

//store
import { useSelectedSeats } from "@/store/store";

//colors
import { Colors } from "@/constants/Colors";

//icons
import FeatherIcon from "react-native-vector-icons/Feather";

//components
import TicketsInfo from "./TicketsInfo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 1;

export const useCartSideBar = () => {
	const sidebarX = useSharedValue(-SIDEBAR_WIDTH);

	const open = () => {
		sidebarX.value = withTiming(0, { duration: 300 });
	};

	const close = () => {
		sidebarX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
	};

	return { sidebarX, open, close };
};

export default function CartSideBar({ sidebarX, seatCount, children, ...props }) {
	const { selectedSeats, removeSeat } = useSelectedSeats();
	const windowHeight = Dimensions.get("window").height;
	const sidebarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sidebarX.value }],
	}));
	const styles = getStyles(windowHeight);

	if (!sidebarX) return null;

	return (
		<Animated.View style={[styles.sidebar, sidebarStyle]}>
			<View style={styles.sidebar_header}>
				<TouchableOpacity
					style={styles.closeBtn}
					onPress={() => {
						seatCount.value = 0;
						sidebarX.value = withTiming(-SIDEBAR_WIDTH);
					}}
				>
					<FeatherIcon name="arrow-left" size={26} color={"black"} />
				</TouchableOpacity>
				<Text style={styles.cartTitle}>Coșul meu</Text>
			</View>
			<View style={styles.sidebar_content}>
				<TicketsInfo selectedSeats={selectedSeats} removeSeat={removeSeat} />
			</View>
			<View style={styles.footer}>
				<View style={{ padding: 15, backgroundColor: "lightblue", marginVertical: 5 }}>
					<Text style={{ fontWeight: "600", fontSize: 16 }}>
						Total: {selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0)} RON{" "}
					</Text>
				</View>
				<TouchableOpacity style={styles.checkoutButton}>
					<Text style={styles.checkoutButton_text}>Checkout</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
}

const getStyles = (height) =>
	StyleSheet.create({
		sidebar: {
			position: "absolute",
			top: 0,
			left: 0,
			width: SIDEBAR_WIDTH,
			height: height - 60,
			backgroundColor: "white",
			elevation: 10, // for Android
			zIndex: 999, // for iOS
		},

		//header

		sidebar_header: {
			flexDirection: "row",
			justifyContent: "space-between",
			borderBottomWidth: 0.2,
			alignItems: "center",
			paddingInline: 15,
			paddingBlock: 20,
		},

		closeBtn: {
			padding: 15,
			left: 3,
			position: "absolute",
		},

		cartTitle: {
			fontSize: 19.5,
			fontWeight: "500",
			marginInline: "auto",
		},

		//content

		sidebar_content: {
			flex: 1,
		},

		//footer

		footer: {
			paddingInline: 15,
			paddingTop: 6.5,
			paddingBottom: 19,
			borderTopWidth: 0.2,
			width: "100%",
			gap: 5,
		},

		checkoutButton: {
			backgroundColor: Colors.tertiary,
			padding: 15.5,
			borderRadius: 5,
		},
		checkoutButton_text: {
			color: "white",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: 16,
		},
	});
