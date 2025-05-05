import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched

//hooks
import { useHandGestures } from "@/hooks/useHandGestures";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";

export default RoomsPlanScreen = ({ navigation, route }) => {
	const { gesture, animatedStyle } = useHandGestures();
	const { locationId, eventId, locationFieldPath } = route.params;

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.svg_container, animatedStyle]}>
				<SvgHallPlan
					roomsWithSeatsData={roomsWithSeats[locationId][eventId]}
					field_path={locationFieldPath}
				/>
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({});
