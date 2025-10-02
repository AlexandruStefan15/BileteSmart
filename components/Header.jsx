import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { images } from "@/assets/images";
import { Colors } from "@/constants";

const SCREEN_WIDTH = Dimensions.get("window").width;

//store
import { useSelectedSeats, useDrawerStore, useCartSidebarStore } from "@/store/store";

//icons
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

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
	arrowColor = "white",
	styleTitle,
	backButtonSize = 26,
}) => {
	const { selectedSeats } = useSelectedSeats();
	const navigation = useNavigation();
	const didMount = useRef(false);
	const toggleDrawer = useDrawerStore((state) => state.toggleDrawer);
	const openSidebar = useCartSidebarStore((state) => state.openSidebar);

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
						<FeatherIcon name="arrow-left" size={backButtonSize} color={arrowColor} />
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					{title && (
						<Text style={[styles.title, { color: arrowColor }]} numberOfLines={1}>
							{title}
						</Text>
					)}
					{showCart && (
						<TouchableOpacity
							onPress={() => {
								openSidebar();
							}}
							style={styles.cart}
						>
							<View style={{ padding: 5, right: -1 }}>
								<IoniconsIcon name="cart-outline" size={28} color={"white"} />
							</View>
							<Animated.View style={[styles.badge, badgeStyle]} />
						</TouchableOpacity>
					)}
				</View>
			</Animated.View>
		);

	if (variant == 2)
		return (
			<Animated.View style={[styles.container2, style]}>
				<View style={styles.backButton2}>
					<TouchableOpacity
						style={{ marginTop: 2, padding: 15 }}
						onPress={() => navigation.goBack()}
					>
						<FeatherIcon name="arrow-left" size={backButtonSize} color={arrowColor} />
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					{title && (
						<Text style={[styles.title, { color: arrowColor }, styleTitle]} numberOfLines={1}>
							{title}
						</Text>
					)}
				</View>
			</Animated.View>
		);

	return (
		<Animated.View style={[styles.container, style]}>
			{showBurgerMenu && (
				<TouchableOpacity style={styles.burgerMenu} onPress={() => toggleDrawer()}>
					<View style={styles.burgerMenu_icon}>
						<FeatherIcon name="align-left" size={24} />
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
		fontSize: 19.7,
		fontWeight: "500",
	},

	// variant 2 styles

	container2: {
		position: "absolute",
		top: 0,
		gap: 0,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 0,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: "transparent",
	},

	backButton2: {
		marginLeft: -15,
	},

	// variant 3 styles

	container3: {
		position: "absolute",
		top: 0,
		gap: 17,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 13,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: Colors.tertiary,
	},

	content: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},

	cart: {
		marginLeft: "auto",
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
