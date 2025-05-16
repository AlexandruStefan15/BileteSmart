import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "@/screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
	</Stack.Navigator>
);

export default ProfileNavigator;
