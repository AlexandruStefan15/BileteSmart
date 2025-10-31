import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import LocationsScreen from "@/screens/LocationsScreen";

//stacks
import LocationNavigator from "./LocationNavigator";

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
