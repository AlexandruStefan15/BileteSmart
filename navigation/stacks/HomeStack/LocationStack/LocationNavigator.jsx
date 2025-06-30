import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import LocationScreen from "@/screens/LocationScreen";

const Stack = createStackNavigator();

const LocationNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="LocationScreen"
			component={LocationScreen}
			options={{ headerShown: false }}
		/>
		{/* <Stack.Screen
			name="EventDetailsStack"
			component={EventsDetailsNavigator}
			options={{ headerShown: false }}
		/> */}
	</Stack.Navigator>
);

export default LocationNavigator;
