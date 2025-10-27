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
	backButtonSize = 25,
}) => {
	const { selectedSeats } = useSelectedSeats();
	const styles = getStyles(variant);
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

	if (variant == "3")
		return (
			<Animated.View style={[styles.container, style]}>
				<View style={styles.backButton}>
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
					{showCart && (
						<TouchableOpacity
							onPress={() => {
								openSidebar();
							}}
							style={styles.cart}
						>
							<View style={{ padding: 5 }}>
								<IoniconsIcon name="cart-outline" size={27} color={"white"} />
							</View>
							<Animated.View style={[styles.badge, badgeStyle]} />
						</TouchableOpacity>
					)}
				</View>
			</Animated.View>
		);

	if (variant == 2)
		return (
			<Animated.View style={[styles.container, style]}>
				<View style={styles.backButton}>
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
					{showCart && (
						<TouchableOpacity
							onPress={() => {
								openSidebar();
							}}
							style={styles.cart}
						>
							<View style={{ padding: 5 }}>
								<IoniconsIcon name="cart-outline" size={26} color={"white"} />
							</View>
							<Animated.View style={[styles.badge, badgeStyle]} />
						</TouchableOpacity>
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

const getStyles = (variant) => {
	if (variant == "3")
		return StyleSheet.create({
			container: {
				backgroundColor: "white",
				boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.34)",
				position: "relative",
				top: 0,
				gap: 1,
				flexDirection: "row",
				paddingHorizontal: 16,
				paddingVertical: 0.5,
				justifyContent: "space-between",
				alignItems: "center",
				zIndex: 10,
				width: "100%",
				paddingLeft: 1,
			},

			content: {
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				flex: 1,
			},

			title: {
				color: "black",
				fontSize: 18.5,
				fontWeight: "500",
			},
		});

	if (variant == "2")
		return StyleSheet.create({
			container: {
				position: "absolute",
				top: 0,
				gap: 0,
				flexDirection: "row",
				paddingHorizontal: 20,
				paddingVertical: 1,
				paddingLeft: 2,
				justifyContent: "space-between",
				alignItems: "center",
				zIndex: 10,
				width: "100%",
				backgroundColor: "transparent",
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
				width: 9,
				height: 9,
				backgroundColor: "red",
				borderRadius: 40,
				position: "absolute",
				right: 3,
				top: 6,
				zIndex: 999,
			},
		});

	return StyleSheet.create({
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
	});
};

export default Header;
