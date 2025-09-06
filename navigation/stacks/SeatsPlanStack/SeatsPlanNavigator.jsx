import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";

const Stack = createStackNavigator();

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
