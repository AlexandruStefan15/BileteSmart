import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
	useSharedValue,
	withTiming,
	useDerivedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { View } from "react-native";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanNavigator from "../SeatsPlanStack/SeatsPlanNavigator";

const Stack = createStackNavigator();

export default function RoomsPlanNavigator({}) {
	const [infoModalShowedOnce, setInfoModalShowedOnce] = useState(false);
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
		<View style={{ flex: 1 }}>
			<Stack.Navigator>
				<Stack.Screen name="RoomsPlanScreen" options={{ headerShown: false }}>
					{(navProps) => (
						<RoomsPlanScreen
							{...navProps}
							seatCount={seatCount}
							badgeStyle={badgeStyle}
							displayBadge={displayBadge}
						/>
					)}
				</Stack.Screen>

				<Stack.Screen name="SeatsPlanStack" options={{ headerShown: false }}>
					{(navProps) => (
						<SeatsPlanNavigator
							{...navProps}
							seatCount={seatCount}
							badgeStyle={badgeStyle}
							displayBadge={displayBadge}
							infoModalShowedOnce={infoModalShowedOnce}
							setInfoModalShowedOnce={setInfoModalShowedOnce}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</View>
	);
}
