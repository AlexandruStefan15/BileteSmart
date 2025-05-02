import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";

const HallPlanScreen = () => {
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const savedTranslateX = useSharedValue(0);
	const savedTranslateY = useSharedValue(0);

	const MIN_SCALE = 1;
	const MAX_SCALE = 3;

	const pinchGesture = Gesture.Pinch()
		.onUpdate((event) => {
			let newScale = savedScale.value * event.scale;
			if (newScale < MIN_SCALE) newScale = MIN_SCALE;
			if (newScale > MAX_SCALE) newScale = MAX_SCALE;
			scale.value = newScale;
		})
		.onEnd(() => {
			savedScale.value = scale.value;
		});

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			const scaledWidth = SCREEN_WIDTH * scale.value;
			const scaledHeight = SCREEN_HEIGHT * scale.value;

			const boundX = (scaledWidth - SCREEN_WIDTH) / 2;
			const boundY = (scaledHeight - SCREEN_HEIGHT) / 2;

			let nextX = savedTranslateX.value + event.translationX;
			let nextY = savedTranslateY.value + event.translationY;

			if (nextX > boundX) nextX = boundX;
			if (nextX < -boundX) nextX = -boundX;

			if (nextY > boundY) nextY = boundY;
			if (nextY < -boundY) nextY = -boundY;

			translateX.value = nextX;
			translateY.value = nextY;
		})
		.onEnd(() => {
			savedTranslateX.value = translateX.value;
			savedTranslateY.value = translateY.value;
		});

	const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scale: scale.value },
		],
	}));

	return (
		<GestureDetector gesture={composedGesture}>
			<Animated.View style={[styles.svg_container, animatedStyle]}>
				<SvgHallPlan locationId={locationId} eventId={eventId} />
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({});

export default HallPlanScreen;
