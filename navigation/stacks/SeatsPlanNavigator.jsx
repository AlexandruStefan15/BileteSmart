import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createNativeStackNavigator();

const SeatsPlanNavigator = forwardRef(({ ...props }, ref) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
				{(navProps) => <SeatsPlanScreen {...navProps} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
});

export default SeatsPlanNavigator;
