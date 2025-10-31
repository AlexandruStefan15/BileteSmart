// HomeNavigator.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { forwardRef } from "react";

import HomeScreen from "@/screens/HomeScreen";
import LocationNavigator from "@/navigation/stacks/LocationNavigator";

const Stack = createNativeStackNavigator();

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
