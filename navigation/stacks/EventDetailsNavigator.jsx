import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import EventDetailsScreen from "@/screens/EventDetailsScreen";

//stacks
import RoomsPlanNavigator from "./RoomsPlanNavigator";

const Stack = createNativeStackNavigator();

const EventDetailsNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="EventDetailsScreen" options={{ headerShown: false }}>
				{(props) => <EventDetailsScreen {...props} />}
			</Stack.Screen>
			<Stack.Screen name="RoomsPlanStack" options={{ headerShown: false }}>
				{(props) => <RoomsPlanNavigator {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default EventDetailsNavigator;
