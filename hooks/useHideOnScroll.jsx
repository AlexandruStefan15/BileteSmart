import {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

const HEADER_HEIGHT = 60;

export const useHideOnScroll = () => {
	const scrollY = useSharedValue(0);
	const prevScrollY = useSharedValue(0);
	const headerTranslateY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;

			const diff = scrollY.value - prevScrollY.value;

			if (diff > 5) {
				headerTranslateY.value = withTiming(-HEADER_HEIGHT);
			} else if (diff < -5) {
				headerTranslateY.value = withTiming(0);
			}

			prevScrollY.value = scrollY.value;
		},
	});

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: headerTranslateY.value }],
	}));

	return {
		scrollHandler,
		headerAnimatedStyle,
		headerHeight: HEADER_HEIGHT,
	};
};
