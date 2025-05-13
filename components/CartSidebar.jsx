import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated";

//colors
import { Colors } from "@/constants/Colors";

//store
import { useSelectedSeats } from "@/store/store";

//components
import TicketsInfo from "./TicketsInfo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

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

export default function CartSideBar({ sidebarX, children }) {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
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
					onPress={() => (sidebarX.value = withTiming(-SIDEBAR_WIDTH))}
				>
					<Text style={styles.closeText}>X</Text>
				</TouchableOpacity>
				<Text style={styles.cartTitle}>Coșul meu</Text>
			</View>
			<View style={styles.sidebar_content}>
				<TicketsInfo selectedSeats={selectedSeats} />
			</View>
			<View style={styles.footer}>
				<View style={{ padding: 15, backgroundColor: "lightblue", marginVertical: 5 }}>
					<Text style={{ fontWeight: "500", fontSize: 15 }}>
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
			backgroundColor: "#f8f8f8",
			elevation: 10, // for Android
			zIndex: 999, // for iOS
		},

		//header

		sidebar_header: {
			flexDirection: "row",
			justifyContent: "space-between",
			borderBottomWidth: 0.5,
			alignItems: "center",
			paddingInline: 15,
			paddingBlock: 20,
		},

		closeBtn: {
			padding: 15,
			left: 1,
			position: "absolute",
		},

		closeText: {
			textAlign: "center",
			fontSize: 14,
			backgroundColor: Colors.primary,
			color: "white",
			padding: 5,
			paddingInline: 11,
			borderRadius: 5,
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
			paddingTop: 7,
			paddingBottom: 20,
			borderTopWidth: 0.2,
			width: "100%",
			gap: 5,
		},

		checkoutButton: {
			backgroundColor: Colors.tertiary,
			padding: 15,
			borderRadius: 5,
		},
		checkoutButton_text: {
			color: "white",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: 16,
		},
	});
