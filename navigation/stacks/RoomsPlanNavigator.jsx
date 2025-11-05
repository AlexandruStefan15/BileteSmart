import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	useSharedValue,
	withTiming,
	useDerivedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { View, Dimensions } from "react-native";

//context
import { BottomSheetMinimizedContext } from "@/context/BottomSheetMinimizedContext";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";

//stacks
import SeatsPlanNavigator from "./SeatsPlanNavigator";

const Stack = createNativeStackNavigator();

export const RoomsPlanNavigator = ({}) => {
	const [infoModalShowedOnce, setInfoModalShowedOnce] = useState(false);
	const seatCount = useSharedValue(0);
	const displayBadge = useSharedValue(true);
	const seatsPlanNavRef = useRef();
	const isBottomSheetCollapsed = useRef(false);

	const bottomSheetTop = useSharedValue(Dimensions.get("screen").height);

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
		<BottomSheetMinimizedContext.Provider value={{ isBottomSheetCollapsed }}>
			<View style={{ flex: 1 }}>
				<Stack.Navigator>
					<Stack.Screen name="RoomsPlanScreen" options={{ headerShown: false }}>
						{(navProps) => (
							<RoomsPlanScreen
								{...navProps}
								seatCount={seatCount}
								badgeStyle={badgeStyle}
								displayBadge={displayBadge}
								sharedTopAnimation={bottomSheetTop}
							/>
						)}
					</Stack.Screen>

					<Stack.Screen name="SeatsPlanStack" options={{ headerShown: false }}>
						{(navProps) => (
							<SeatsPlanNavigator
								{...navProps}
								ref={seatsPlanNavRef}
								seatCount={seatCount}
								badgeStyle={badgeStyle}
								displayBadge={displayBadge}
								infoModalShowedOnce={infoModalShowedOnce}
								setInfoModalShowedOnce={setInfoModalShowedOnce}
								sharedTopAnimation={bottomSheetTop}
							/>
						)}
					</Stack.Screen>
				</Stack.Navigator>
				<View
					style={{
						position: "absolute",
						width: 100,
						height: 100,
						backgroundColor: "red",
						inset: 0,
					}}
				/>
			</View>
		</BottomSheetMinimizedContext.Provider>
	);
};

export default RoomsPlanNavigator;
