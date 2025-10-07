import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAccountScreen from "@/screens/MyAccountScreen";

const Stack = createStackNavigator();

const MyAccountNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="MyAccountScreen"
			component={MyAccountScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default MyAccountNavigator;
