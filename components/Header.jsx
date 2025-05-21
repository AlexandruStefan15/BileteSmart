import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { images } from "@/assets/images";
import { Colors } from "@/constants";

const SCREEN_WIDTH = Dimensions.get("window").width;

//store
import { useSelectedSeats, useCartBadge } from "@/store/store";

//icons
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

//components
import CartSideBar, { useCartSideBar } from "@/components/CartSideBar";

const Header = ({
	title = false,
	style,
	logo = images.logo,
	showBurgerMenu = true,
	showCart = false,
	variant = "",
	seatCount = {},
	badgeStyle,
	displayBadge = {},
}) => {
	const { selectedSeats } = useSelectedSeats();
	const navigation = useNavigation();
	const { sidebarX, open, close } = useCartSideBar();
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) {
			displayBadge.value = true;
			seatCount.value = selectedSeats.length;
		} else {
			didMount.current = true;
		}
	}, [selectedSeats.length]);

	if (variant == 3)
		return (
			<Animated.View style={[styles.container3, style]}>
				<View style={styles.backButton}>
					<TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
						<FeatherIcon name="arrow-left" size={26} color={"white"} />
					</TouchableOpacity>
				</View>
				{showCart && (
					<TouchableOpacity
						onPress={() => {
							displayBadge.value = false;
							open();
						}}
						style={styles.burgerMenu}
					>
						<View style={{ padding: 5, right: -1 }}>
							<Ionicons name="cart-outline" size={28} color={"white"} />
						</View>
						<Animated.View style={[styles.badge, badgeStyle]} />
					</TouchableOpacity>
				)}
				<CartSideBar sidebarX={sidebarX} />
			</Animated.View>
		);

	if (variant == 2)
		return (
			<Animated.View style={[styles.container2, style]}>
				<View style={styles.backButton}>
					<TouchableOpacity
						style={{ padding: 20, left: -20, top: -18 }}
						onPress={() => navigation.goBack()}
					>
						<FeatherIcon name="arrow-left" size={26} color={Colors.dark.text.primary} />
					</TouchableOpacity>
				</View>
			</Animated.View>
		);

	return (
		<Animated.View style={[styles.container, style]}>
			{showBurgerMenu && (
				<TouchableOpacity style={styles.burgerMenu}>
					<View style={styles.burgerMenu_icon}>
						<FeatherIcon name="align-left" size={25} />
					</View>
				</TouchableOpacity>
			)}
			{logo && (
				<View style={{ width: 120, height: 35 }}>
					<Image
						source={logo}
						style={{
							width: "100%",
							height: "100%",
							resizeMode: "contain",
						}}
					/>
				</View>
			)}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "fixed",
		flexDirection: "row-reverse",
		paddingHorizontal: 20,
		paddingVertical: 14,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "white",
		zIndex: 10,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},

	burgerMenu_icon: {
		padding: 8,
		borderRadius: 10,
		backgroundColor: Colors.light.background.primary,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: "auto",
	},

	// variant 2 styles

	container2: {
		position: "absolute",
		top: 0,
		flexDirection: "row-reverse",
		paddingHorizontal: 20,
		paddingVertical: 14,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: "transparent",
	},

	backButton: {
		marginRight: "auto",
	},

	// variant 3 styles

	container3: {
		position: "absolute",
		top: 0,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 12,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: Colors.tertiary,
	},

	badge: {
		width: 10,
		height: 10,
		backgroundColor: "red",
		borderRadius: 40,
		position: "absolute",
		right: 2,
		top: 7,
		zIndex: 999,
	},
});

export default Header;
