import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccountScreen from "@/screens/MyAccountScreen";
import ChangeAccountDataScreen from "@/screens/ChangeAccountDataScreen";

const Stack = createNativeStackNavigator();

const MyAccountNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="MyAccountScreen"
			component={MyAccountScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="ChangeAccountDataScreen"
			component={ChangeAccountDataScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default MyAccountNavigator;
