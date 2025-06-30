import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventsScreen from "@/screens/EventsScreen";

const Stack = createStackNavigator();

const EventsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: false }} />
	</Stack.Navigator>
);

export default EventsNavigator;
