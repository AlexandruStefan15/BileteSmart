import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	useSharedValue,
	withTiming,
	useDerivedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { View, Dimensions } from "react-native";

//store
import { useCartSidebarStore } from "@/store";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";

//stacks
import SeatsPlanNavigator from "./SeatsPlanNavigator";

//components
import SeeTheCartBottomSheet from "@/components/SeeTheCartBottomSheet";
import CartSidebar from "@/components/CartSidebar";

const Stack = createNativeStackNavigator();

export const RoomsPlanNavigator = ({}) => {
	const sidebarX = useCartSidebarStore((s) => s.sidebarX);
	const [infoModalShowedOnce, setInfoModalShowedOnce] = useState(false);
	const seatCount = useSharedValue(0);
	const displayBadge = useSharedValue(true);
	const isBottomSheetCollapsed = useRef(false);

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
			<CartSidebar sidebarX={sidebarX} displayBadge={displayBadge} />
			<SeeTheCartBottomSheet isBottomSheetCollapsed={isBottomSheetCollapsed} />
		</View>
	);
};

export default RoomsPlanNavigator;
