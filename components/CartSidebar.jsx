import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated";

//store
import { useSelectedSeats } from "@/store/store";

//components
import TicketsInfo from "./TicketsInfo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.82;

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
				<Text style={styles.cartTitle}>Cart</Text>
			</View>
			<View style={styles.sidebar_content}>
				<TicketsInfo selectedSeats={selectedSeats} />
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
			paddingBlock: 10,
		},

		//header

		sidebar_header: {
			flexDirection: "row-reverse",
			justifyContent: "space-between",
			borderBottomWidth: 0.5,
			alignItems: "center",
			paddingInline: 15,
		},

		closeBtn: {
			padding: 15,
			right: 5,
		},

		closeText: {
			fontSize: 18,
		},
		cartTitle: {
			fontSize: 22,
		},

		//content

		sidebar_content: {
			flex: 1,
		},
	});
