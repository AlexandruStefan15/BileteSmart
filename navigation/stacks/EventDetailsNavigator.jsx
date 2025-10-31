import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens & navigators
import EventDetailsScreen from "@/screens/EventDetailsScreen";
import RoomsPlanNavigator from "./RoomsPlanStack/RoomsPlanNavigator";

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
