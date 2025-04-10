import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeMain from "../../screens/HomeMain";

const Stack = createStackNavigator();

const HomeScreen_stack = () => (
	<Stack.Navigator>
		<Stack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
		{/* <Stack.Screen name="SearchMain" component={SearchMain} /> */}
	</Stack.Navigator>
);

export default HomeScreen_stack;
