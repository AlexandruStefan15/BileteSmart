import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
	useSharedValue,
	withTiming,
	useDerivedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createStackNavigator();

export default function RoomsPlanNavigator({}) {
	const seatCount = useSharedValue(0);

	const showBadge = useDerivedValue(() => {
		return seatCount.value > 0;
	});

	const badgeStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(showBadge.value ? 1 : 0, { duration: 150 }),
			transform: [{ scale: withTiming(showBadge.value ? 1 : 0.5, { duration: 150 }) }],
		};
	});

	return (
		<Stack.Navigator>
			<Stack.Screen name="RoomsPlanScreen" options={{ headerShown: false }}>
				{(props) => <RoomsPlanScreen {...props} seatCount={seatCount} badgeStyle={badgeStyle} />}
			</Stack.Screen>

			<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
				{(props) => <SeatsPlanScreen {...props} seatCount={seatCount} badgeStyle={badgeStyle} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
