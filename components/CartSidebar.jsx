// CartSidebar.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

export const useCartSidebar = () => {
	const sidebarX = useSharedValue(-SIDEBAR_WIDTH);

	const open = () => {
		sidebarX.value = withTiming(0, { duration: 300 });
	};

	const close = () => {
		sidebarX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
	};

	return { sidebarX, open, close };
};

const CartSidebar = ({ sidebarX, children }) => {
	const sidebarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sidebarX.value }],
	}));

	return (
		<Animated.View style={[styles.sidebar, sidebarStyle]}>
			<TouchableOpacity
				style={styles.closeBtn}
				onPress={() => (sidebarX.value = withTiming(-SIDEBAR_WIDTH))}
			>
				<Text style={styles.closeText}>X</Text>
			</TouchableOpacity>
			<Text style={styles.cartTitle}>Cart</Text>
			{children}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		left: 0,
		width: SIDEBAR_WIDTH,
		height: "100%",
		backgroundColor: "#f8f8f8",
		elevation: 5,
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	closeBtn: {
		position: "absolute",
		top: 20,
		right: 20,
	},
	closeText: {
		fontSize: 18,
	},
	cartTitle: {
		fontSize: 22,
		marginBottom: 20,
	},
});

export default CartSidebar;
