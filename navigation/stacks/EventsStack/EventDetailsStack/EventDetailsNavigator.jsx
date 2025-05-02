import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import EventDetailsScreen from "@/screens/EventsStack/EventDetailsStack/EventDetailsScreen";

const Stack = createStackNavigator();

const EventsDetailsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="EventDetailsScreen"
			component={EventDetailsScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default EventsDetailsNavigator;
