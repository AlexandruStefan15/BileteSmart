import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import EventsScreen from "@/screens/EventsScreen";

const Stack = createNativeStackNavigator();

const EventsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: false }} />
	</Stack.Navigator>
);

export default EventsNavigator;
