import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ContactScreen from "../../screens/ContactScreen";

const Stack = createStackNavigator();

const ContactScreen_stack = () => (
	<Stack.Navigator>
		<Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
		{/* <Stack.Screen name="ContactScreen_settings" component={ContactScreen_settings} /> */}
	</Stack.Navigator>
);

export default ContactScreen_stack;
