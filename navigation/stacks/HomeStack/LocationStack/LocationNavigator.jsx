import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import LocationScreen from "@/screens/LocationScreen";
import GalleryScreen from "@/screens/GalleryScreen";

const Stack = createStackNavigator();

const LocationNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="LocationScreen"
			component={LocationScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen name="GalleryScreen" component={GalleryScreen}></Stack.Screen>
	</Stack.Navigator>
);

export default LocationNavigator;
