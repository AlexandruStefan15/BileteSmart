import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	runOnJS,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const drawerWidth = SCREEN_WIDTH * 0.75;

export const useDrawer = () => {
	const isOpen = useSharedValue(0); // 0 = closed, 1 = open

	const openDrawer = () => (isOpen.value = withTiming(1));
	const closeDrawer = () => (isOpen.value = withTiming(0));

	return { isOpen, openDrawer, closeDrawer };
};

const CustomDrawer = ({ isOpen, closeDrawer, navigation }) => {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: withTiming(isOpen.value ? 0 : -drawerWidth) }],
		};
	});

	const handleNavigate = (screen) => {
		closeDrawer(); // close first
		navigation.navigate(screen);
	};

	return (
		<Animated.View style={[styles.drawer, animatedStyle]}>
			<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Contact")}>
				<Text style={styles.text}>Contact</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Ticketing")}>
				<Text style={styles.text}>Ticketing</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.link} onPress={closeDrawer}>
				<Text style={styles.text}>Close</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default CustomDrawer;

const styles = StyleSheet.create({
	drawer: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: drawerWidth,
		backgroundColor: "#fff",
		elevation: 5,
		paddingTop: 60,
		paddingHorizontal: 20,
		zIndex: 9999,
		height: SCREEN_HEIGHT,
	},
	link: {
		paddingVertical: 15,
	},
	text: {
		fontSize: 18,
	},
});
