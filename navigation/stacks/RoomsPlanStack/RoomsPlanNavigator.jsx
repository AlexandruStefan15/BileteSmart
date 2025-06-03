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
import SeatsPlanNavigator from "../SeatsPlanStack/SeatsPlanNavigator";

const Stack = createStackNavigator();

export default function RoomsPlanNavigator({}) {
	const seatCount = useSharedValue(0);
	const displayBadge = useSharedValue(true);

	const showBadge = useDerivedValue(() => {
		return seatCount.value > 0 && displayBadge.value;
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
				{(props) => (
					<RoomsPlanScreen
						{...props}
						seatCount={seatCount}
						badgeStyle={badgeStyle}
						displayBadge={displayBadge}
					/>
				)}
			</Stack.Screen>

			<Stack.Screen name="SeatsPlanStack" options={{ headerShown: false }}>
				{(props) => (
					<SeatsPlanNavigator
						{...props}
						seatCount={seatCount}
						badgeStyle={badgeStyle}
						displayBadge={displayBadge}
					/>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
