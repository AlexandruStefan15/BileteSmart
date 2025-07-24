// hooks/useCartSideBar.js
import { withTiming } from "react-native-reanimated";
import { SharedValue, useSharedValue } from "react-native-reanimated";

// make sure this import is correct in your setup
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

// shared value stored outside React lifecycle
const sidebarX = { value: null };

export const useCartSidebar = () => {
	// initialize once
	if (sidebarX.value === null) {
		const _shared = require("react-native-reanimated").useSharedValue(-SIDEBAR_WIDTH);
		sidebarX.value = _shared;
	}

	const open = () => {
		sidebarX.value.value = withTiming(0, { duration: 300 });
	};

	const close = () => {
		sidebarX.value.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
	};

	return { sidebarX: sidebarX.value, open, close };
};
