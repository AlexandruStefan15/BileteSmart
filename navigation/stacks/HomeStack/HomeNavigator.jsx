// HomeNavigator.jsx
import { createStackNavigator } from "@react-navigation/stack";
import React, { forwardRef } from "react";
import { NavigationContainerRef } from "@react-navigation/native";

import HomeScreen from "@/screens/HomeScreen";
import LocationNavigator from "@/navigation/stacks/HomeStack/LocationStack/LocationNavigator";

const Stack = createStackNavigator();

const HomeNavigator = forwardRef((props, ref) => {
	return (
		<Stack.Navigator ref={ref}>
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="LocationStack"
				component={LocationNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
});

export default HomeNavigator;
