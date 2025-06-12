import React, { useState, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens & navigators
import EventDetailsScreen from "@/screens/EventDetailsScreen";
import RoomsPlanNavigator from "../../RoomsPlanStack/RoomsPlanNavigator";

const Stack = createStackNavigator();

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
