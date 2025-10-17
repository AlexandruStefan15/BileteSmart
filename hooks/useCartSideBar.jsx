import { withTiming, makeShared } from "react-native-reanimated";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

// create global shared value once
const sidebarX = makeShared(-SIDEBAR_WIDTH);

export const useCartSidebar = () => {
	const open = () => {
		sidebarX.value = withTiming(0, { duration: 300 });
	};

	const close = () => {
		sidebarX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
	};

	return { sidebarX, open, close };
};
