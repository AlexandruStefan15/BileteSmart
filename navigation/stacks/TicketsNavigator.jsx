import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TicketsScreen from "@/screens/TicketsScreen";

const Stack = createStackNavigator();

const TicketsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="TicketsScreen" component={TicketsScreen} options={{ headerShown: false }} />
	</Stack.Navigator>
);

export default TicketsNavigator;
