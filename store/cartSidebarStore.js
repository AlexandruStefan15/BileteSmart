import { create } from "zustand";
import { withTiming, makeMutable, Easing, ReduceMotion, runOnUI } from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const sidebarX = makeMutable(-SCREEN_WIDTH);

export const useCartSidebarStore = create(() => ({
	sidebarX,
	openSidebar: () => {
		runOnUI(() => {
			sidebarX.value = withTiming(0, {
				duration: 400,
				easing: Easing.out(Easing.cubic),
				reduceMotion: ReduceMotion.System,
			});
		})();
	},
	closeSidebar: () => {
		runOnUI(() => {
			sidebarX.value = withTiming(-SCREEN_WIDTH, {
				duration: 400,
				easing: Easing.out(Easing.cubic),
				reduceMotion: ReduceMotion.System,
			});
		})();
	},
}));
