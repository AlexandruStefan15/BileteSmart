import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useDrawerStore } from "@/store/store";
import { navigationRef } from "@/navigation/navigationRef";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const drawerWidth = SCREEN_WIDTH * 0.75;

const CustomDrawer = ({ navigation }) => {
	const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);
	const translateX = useSharedValue(-drawerWidth);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const panGesture = Gesture.Pan()
		.enabled(isDrawerOpen)
		.onUpdate((event) => {
			if (event.translationX < 0) {
				translateX.value = event.translationX;
			}
		})
		.onEnd((event) => {
			if (event.translationX < -50) {
				translateX.value = withTiming(-drawerWidth);
				runOnJS(closeDrawer)();
			} else {
				translateX.value = withTiming(0);
			}
		});

	useEffect(() => {
		translateX.value = withTiming(isDrawerOpen ? 0 : -drawerWidth, { duration: 200 });
	}, [isDrawerOpen]);

	const handleNavigate = (screen) => {
		closeDrawer();
		if (navigationRef.isReady()) {
			navigationRef.navigate(screen);
		}
	};

	return (
		<>
			{isDrawerOpen && <Pressable style={styles.overlay} onPress={closeDrawer} />}
			<GestureDetector gesture={panGesture}>
				<Animated.View style={[styles.drawer, animatedStyle]}>
					<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Acasa")}>
						<Text style={styles.text}>Acasa</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Evenimente")}>
						<Text style={styles.text}>Evenimente</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Contact")}>
						<Text style={styles.text}>Contact</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.link} onPress={() => handleNavigate("Ticketing")}>
						<Text style={styles.text}>Ticketing</Text>
					</TouchableOpacity>
				</Animated.View>
			</GestureDetector>
		</>
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
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		zIndex: 9998,
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		pointerEvents: "box-only",
	},
	link: {
		paddingVertical: 15,
	},
	text: {
		fontSize: 18,
	},
});
