import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/HomeStack/HomeScreen";
import LocationNavigator from "./LocationStack/LocationNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
		<Stack.Screen
			name="LocationScreen"
			component={LocationNavigator}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default HomeNavigator;
