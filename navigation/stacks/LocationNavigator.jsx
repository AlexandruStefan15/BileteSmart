import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import LocationScreen from "@/screens/LocationScreen";
import GalleryScreen from "@/screens/GalleryScreen";
import LocationMapScreen from "@/screens/LocationMapScreen";

const Stack = createNativeStackNavigator();

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
			options={{ headerShown: false }}
		></Stack.Screen>
		<Stack.Screen
			name="LocationMapScreen"
			component={LocationMapScreen}
			options={{ headerShown: false }}
		></Stack.Screen>
	</Stack.Navigator>
);

export default LocationNavigator;
