import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";

const Stack = createStackNavigator();

const SeatsPlanNavigator = ({ seatCount, badgeStyle, displayBadge, openSidebar }) => (
	<Stack.Navigator>
		<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
			{(props) => (
				<SeatsPlanScreen
					{...props}
					seatCount={seatCount}
					badgeStyle={badgeStyle}
					displayBadge={displayBadge}
					openSidebar={openSidebar}
				/>
			)}
		</Stack.Screen>
		<Stack.Screen name="CheckoutScreen" options={{ headerShown: false }}>
			{(props) => <CheckoutScreen {...props} />}
		</Stack.Screen>
	</Stack.Navigator>
);

export default SeatsPlanNavigator;
