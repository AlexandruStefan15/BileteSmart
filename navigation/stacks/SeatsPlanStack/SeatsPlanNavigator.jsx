import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";

const Stack = createStackNavigator();

const SeatsPlanNavigator = ({
	seatCount,
	badgeStyle,
	displayBadge,
	openSidebar,
	infoModalShowedOnce,
	setInfoModalShowedOnce,
}) => (
	<Stack.Navigator>
		<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
			{(navProps) => (
				<SeatsPlanScreen
					{...navProps}
					seatCount={seatCount}
					badgeStyle={badgeStyle}
					displayBadge={displayBadge}
					openSidebar={openSidebar}
					infoModalShowedOnce={infoModalShowedOnce}
					setInfoModalShowedOnce={setInfoModalShowedOnce}
				/>
			)}
		</Stack.Screen>
		<Stack.Screen name="CheckoutScreen" options={{ headerShown: false }}>
			{(navProps) => <CheckoutScreen {...navProps} />}
		</Stack.Screen>
	</Stack.Navigator>
);

export default SeatsPlanNavigator;
