import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrderHistoryScreen from "@/screens/OrderHistoryScreen";
import OrderedTicketsScreen from "@/screens/OrderedTicketsScreen";

const Stack = createNativeStackNavigator();

const OrderHistoryNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="OrderHistoryScreen"
			component={OrderHistoryScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="OrderedTicketsScreen"
			component={OrderedTicketsScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default OrderHistoryNavigator;
