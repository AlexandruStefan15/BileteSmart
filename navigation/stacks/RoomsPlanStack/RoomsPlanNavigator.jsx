import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Animated, {
	useSharedValue,
	withTiming,
	useDerivedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createStackNavigator();

export default function RoomsPlanNavigator({ selectedSeats, setSelectedSeats }) {
	const seatCount = useSharedValue(selectedSeats.length);

	useEffect(() => {
		seatCount.value = selectedSeats.length;
	}, [selectedSeats.length]);

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
				{(props) => (
					<RoomsPlanScreen
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
						seatCount={seatCount}
						badgeStyle={badgeStyle}
					/>
				)}
			</Stack.Screen>

			<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
				{(props) => (
					<SeatsPlanScreen
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
						seatCount={seatCount}
						badgeStyle={badgeStyle}
					/>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
