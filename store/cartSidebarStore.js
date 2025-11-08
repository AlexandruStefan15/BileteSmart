import { create } from "zustand";
import { withTiming, makeMutable, Easing, ReduceMotion } from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const sidebarX = makeMutable(-SCREEN_WIDTH);

export const useCartSidebarStore = create((set) => ({
	sidebarX,
	isSidebarOpen: false,

	openSidebar: () => {
		sidebarX.value = withTiming(0, {
			duration: 400,
			easing: Easing.out(Easing.cubic),
			reduceMotion: ReduceMotion.System,
		});
		setTimeout(() => {
			set({ isSidebarOpen: true });
		}, 300);
	},

	closeSidebar: () => {
		sidebarX.value = withTiming(-SCREEN_WIDTH, {
			duration: 400,
			easing: Easing.out(Easing.cubic),
			reduceMotion: ReduceMotion.System,
		});
		setTimeout(() => {
			set({ isSidebarOpen: false });
		}, 300);
	},
}));
