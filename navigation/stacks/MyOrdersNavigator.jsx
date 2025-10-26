import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyOrdersScreen from "@/screens/MyOrdersScreen";
import OrderedTicketsScreen from "@/screens/OrderedTicketsScreen";

const Stack = createNativeStackNavigator();

const MyOrdersNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="MyOrdersScreen"
			component={MyOrdersScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="OrderedTicketsScreen"
			component={OrderedTicketsScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default MyOrdersNavigator;
