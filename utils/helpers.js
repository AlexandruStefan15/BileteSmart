export function formatRomanianDate(dateStr) {
	const date = new Date(dateStr);

	const days = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];

	const months = [
		"ianuarie",
		"februarie",
		"martie",
		"aprilie",
		"mai",
		"iunie",
		"iulie",
		"august",
		"septembrie",
		"octombrie",
		"noiembrie",
		"decembrie",
	];

	const dayOfWeek = days[date.getDay()];
	const dayOfMonth = date.getDate();
	const month = months[date.getMonth()];

	return `${dayOfWeek} ${dayOfMonth} ${month}`;
}

export function formatDate(dateString) {
	const date = new Date(dateString);

	return date.toLocaleDateString("ro-RO", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	// console.log(formatDateToRomanian("2025-04-26"));
	// Output: "26 aprilie 2025"
}

export function removeFirstWord(str) {
	const words = str.trim().split(" ");
	words.shift(); // remove the first word
	return words.join(" ");
}

// utils/CartController.js
import { Dimensions } from "react-native";
import { withTiming, useSharedValue } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

const sidebarX = { value: null };

export const getCartController = () => {
	if (!sidebarX.value) {
		sidebarX.value = require("react-native-reanimated").useSharedValue(-SIDEBAR_WIDTH);
	}

	const open = () => {
		sidebarX.value.value = withTiming(0, { duration: 300 });
	};

	const close = () => {
		sidebarX.value.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
	};

	return { sidebarX: sidebarX.value, open, close };
};
