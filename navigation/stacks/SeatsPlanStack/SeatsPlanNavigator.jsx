import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";

const Stack = createNativeStackNavigator();

const SeatsPlanNavigator = ({ ...props }) => (
	<Stack.Navigator>
		<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
			{(navProps) => (
				<SeatsPlanScreen
					{...navProps}
					seatCount={props.seatCount}
					badgeStyle={props.badgeStyle}
					displayBadge={props.displayBadge}
					openSidebar={props.openSidebar}
					infoModalShowedOnce={props.infoModalShowedOnce}
					setInfoModalShowedOnce={props.setInfoModalShowedOnce}
				/>
			)}
		</Stack.Screen>
		<Stack.Screen name="CheckoutScreen" options={{ headerShown: false }}>
			{(navProps) => <CheckoutScreen {...navProps} />}
		</Stack.Screen>
	</Stack.Navigator>
);

export default SeatsPlanNavigator;
