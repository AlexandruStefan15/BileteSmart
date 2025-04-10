import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ContactMain from "../../screens/ContactMain";
/* import ContactScreen from '../screens/SettingsScreen'; */

const Stack = createStackNavigator();

const ContactScreen_stack = () => (
	<Stack.Navigator>
		<Stack.Screen name="ContactMain" component={ContactMain} options={{ headerShown: false }} />
		{/* <Stack.Screen name="ContactSettings" component={ContactSettings} /> */}
	</Stack.Navigator>
);

export default ContactScreen_stack;
