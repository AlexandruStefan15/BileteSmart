import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TicketsScreen from "@/screens/TicketsScreen";
import OrderedTicketsScreen from "@/screens/OrderedTicketsScreen";

const Stack = createNativeStackNavigator();

const TicketsNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen name="TicketsScreen" component={TicketsScreen} options={{ headerShown: false }} />
		<Stack.Screen
			name="OrderedTicketsScreen"
			component={OrderedTicketsScreen}
			options={{ headerTitle: "Bilete" }}
		/>
	</Stack.Navigator>
);

export default TicketsNavigator;
