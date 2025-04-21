import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ContactScreen from "@/screens/ContactScreen";

const Stack = createStackNavigator();

const ContactNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
	</Stack.Navigator>
);

export default ContactNavigator;
