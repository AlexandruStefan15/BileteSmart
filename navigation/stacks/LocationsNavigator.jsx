import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LocationsScreen from "@/screens/LocationsScreen";
import LocationNavigator from "./HomeStack/LocationStack/LocationNavigator";

const Stack = createNativeStackNavigator();

const LocationsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="LocationsScreen"
			component={LocationsScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="LocationStack"
			component={LocationNavigator}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default LocationsNavigator;
