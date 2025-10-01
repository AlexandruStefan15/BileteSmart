import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import LocationScreen from "@/screens/LocationScreen";
import GalleryScreen from "@/screens/GalleryScreen";
import LocationMapScreen from "@/screens/LocationMapScreen";

const Stack = createStackNavigator();

const LocationNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="LocationScreen"
			component={LocationScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="GalleryScreen"
			component={GalleryScreen}
			options={{ headerTitle: "Galerie" }}
		></Stack.Screen>
		<Stack.Screen
			name="LocationMapScreen"
			component={LocationMapScreen}
			options={{ headerShown: false }}
		></Stack.Screen>
	</Stack.Navigator>
);

export default LocationNavigator;
