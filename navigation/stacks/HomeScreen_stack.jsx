import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";

const Stack = createStackNavigator();

const HomeScreen_stack = () => (
	<Stack.Navigator>
		<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
		{/* <Stack.Screen name="SearchMain" component={SearchMain} /> */}
	</Stack.Navigator>
);

export default HomeScreen_stack;
