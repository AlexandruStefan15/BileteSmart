import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationScreen from "@/screens/LocationStack/LocationScreen";

const Stack = createStackNavigator();

const LocationNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="LocationScreen"
			component={LocationScreen}
			options={{ headerShown: false }}
		/>
		{/* <Stack.Screen name="SearchMain" component={SearchMain} /> */}
	</Stack.Navigator>
);

export default LocationNavigator;
