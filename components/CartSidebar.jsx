import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	BackHandler,
	StatusBar,
} from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

//store
import { useSelectedSeats } from "@/store/store";

//colors
import { Colors } from "@/constants/Colors";

//icons
import FeatherIcon from "react-native-vector-icons/Feather";

//components
import TicketList from "./TicketList";

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

export default function CartSideBar({ sidebarX, resetBadge, children, ...props }) {
	const { selectedSeats, removeSeat } = useSelectedSeats();
	const statusBarHeight = StatusBar.currentHeight || 24;
	const windowHeight = Dimensions.get("window").height;
	const styles = getStyles(windowHeight, statusBarHeight);
	const navigation = useNavigation();

	const sidebarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sidebarX.value }],
	}));

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			if (sidebarX.value === 0) {
				sidebarX.value = withTiming(-SIDEBAR_WIDTH);
				props.displayBadge.value = false;
				return true;
			}
			return false;
		});

		return () => backHandler.remove();
	}, [sidebarX]);

	if (!sidebarX) return null;

	return (
		<Animated.View style={[styles.sidebar, sidebarStyle]}>
			<View style={styles.sidebar_header}>
				<TouchableOpacity
					style={styles.closeBtn}
					onPress={() => {
						props.displayBadge.value = false;
						sidebarX.value = withTiming(-SIDEBAR_WIDTH);
					}}
				>
					<FeatherIcon name="arrow-left" size={26} color={"black"} />
				</TouchableOpacity>
				<Text style={styles.cartTitle}>Coșul meu</Text>
			</View>
			<View style={styles.sidebar_content}>
				<TicketList />
			</View>
			<View style={styles.sidebar_footer}>
				<View style={{ padding: 15, backgroundColor: "#bee1ecd1", marginVertical: 6 }}>
					<Text style={{ fontWeight: "600", fontSize: 16 }}>
						Total: {selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0)} RON{" "}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.checkoutButton}
					onPress={() =>
						navigation.navigate("SeatsPlanStack", {
							screen: "CheckoutScreen",
						})
					}
				>
					<Text style={styles.checkoutButton_text}>Checkout</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
}

const getStyles = (windowHeight, statusBarHeight) =>
	StyleSheet.create({
		sidebar: {
			position: "absolute",
			top: 0,
			left: 0,
			width: SIDEBAR_WIDTH,
			height: windowHeight,
			backgroundColor: "white",
			elevation: 10, // for Android
			zIndex: 999, // for iOS
			overflow: "hidden",
		},

		//header
		sidebar_header: {
			flexDirection: "row",
			justifyContent: "space-between",
			borderBottomWidth: 0.5,
			borderColor: "black",
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
			fontSize: 19,
			fontWeight: "500",
			marginInline: "auto",
		},

		//content

		sidebar_content: {
			flex: 1,
			backgroundColor: "white",
		},

		//footer

		sidebar_footer: {
			paddingInline: 15,
			paddingTop: 6.5,
			paddingBottom: 15,
			borderColor: "grey",
			/* borderColor:"#bababad9", */
			borderTopWidth: 0.5,
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
