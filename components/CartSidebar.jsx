import React, { useEffect, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	BackHandler,
	Image,
} from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { navigationRef } from "@/navigation/navigationRef";

//store
import { useSelectedSeats } from "@/store";

//colors
import { Colors } from "@/constants/Colors";

//icons
import FeatherIcon from "react-native-vector-icons/Feather";

//images
import { images } from "@/assets/images";

//components
import TicketList from "./TicketList";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 1;

export default React.memo(function CartSidebar({
	sidebarX,
	resetBadge,
	children,
	navigation,
	...props
}) {
	const { selectedSeats } = useSelectedSeats();

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
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.closeBtn}
					onPress={() => {
						props.displayBadge.value = false;
						sidebarX.value = withTiming(-SIDEBAR_WIDTH);
					}}
				>
					<FeatherIcon name="arrow-left" size={26} color={"black"} />
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
						marginInline: "auto",
					}}
				>
					<Text style={styles.cartTitle}>Coșul meu ({selectedSeats.length})</Text>
					{/* <Image source={images.shoppingCart} style={{ width: 24, height: 24 }} /> */}
				</View>
			</View>
			<View style={styles.content}>
				<TicketList />
			</View>
			<CartSidebarFooter />
		</Animated.View>
	);
});

const CartSidebarFooter = React.memo(() => {
	const { selectedSeats } = useSelectedSeats();

	const totalPrice = useMemo(
		() => selectedSeats.reduce((sum, seat) => sum + parseFloat(seat.price), 0),
		[selectedSeats]
	);

	if (selectedSeats.length == 0) return null;

	return (
		<View style={styles.footer}>
			<View style={{ padding: 15, backgroundColor: "#bee1ecd1", marginVertical: 6 }}>
				<Text style={{ fontWeight: "600", fontSize: 16 }}>Total: {totalPrice} RON</Text>
			</View>
			<TouchableOpacity
				style={styles.checkoutButton}
				onPress={() =>
					navigationRef.navigate("SeatsPlanStack", {
						screen: "CheckoutScreen",
					})
				}
			>
				<Text style={styles.checkoutButton_text}>Checkout</Text>
			</TouchableOpacity>
		</View>
	);
});

const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		width: SIDEBAR_WIDTH,
		height: "100%",
		backgroundColor: "white",
		elevation: 10, // for Android
		zIndex: 999, // for iOS
		overflow: "hidden",
	},

	//header
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		boxShadow: "0 1px 6px rgba(0, 0, 0, 0.15)",
		alignItems: "center",
		paddingInline: 15,
		paddingBlock: 20,
		zIndex: 9,
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

	content: {
		flex: 1,
		backgroundColor: "#f5f5f6",
	},

	//footer

	footer: {
		paddingInline: 15,
		paddingTop: 10,
		paddingBottom: 18,
		width: "100%",
		gap: 3,
		boxShadow: "0 1px 6px rgba(0, 0, 0, 0.15)",
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
