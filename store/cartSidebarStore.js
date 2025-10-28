import { create } from "zustand";
import { withTiming, makeMutable, Easing, ReduceMotion } from "react-native-reanimated";
import { Dimensions } from "react-native";

const SIDEBAR_WIDTH = Dimensions.get("window").width;
const sidebarX = makeMutable(-SIDEBAR_WIDTH);

export const useCartSidebarStore = create(() => ({
	sidebarX,
	openSidebar: () => {
		sidebarX.value = withTiming(0, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
	},
	closeSidebar: () => {
		sidebarX.value = withTiming(-SIDEBAR_WIDTH, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
	},
}));
