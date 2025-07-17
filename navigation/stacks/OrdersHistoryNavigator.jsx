import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersHistoryScreen from "@/screens/OrdersHistoryScreen";

const Stack = createStackNavigator();

const OrdersHistoryNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="OrdersHistoryScreen"
			component={OrdersHistoryScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default OrdersHistoryNavigator;
