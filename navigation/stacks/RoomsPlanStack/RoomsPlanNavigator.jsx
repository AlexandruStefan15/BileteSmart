import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createStackNavigator();

export default RoomsPlanNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="RoomsPlanScreen"
			component={RoomsPlanScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="SeatsPlanScreen"
			component={SeatsPlanScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);
