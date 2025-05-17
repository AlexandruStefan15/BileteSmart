import React, { useState, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//context
import { SelectedSeatsContext } from "@/context/SelectedSeatsContext";

//screens
import EventDetailsScreen from "@/screens/EventDetailsScreen";
import RoomsPlanNavigator from "../../RoomsPlanStack/RoomsPlanNavigator";

const Stack = createStackNavigator();

const EventsDetailsNavigator = () => {
	const [selectedSeats, setSelectedSeats] = useState(new Set());
	const contextValue = useMemo(() => ({ selectedSeats, setSelectedSeats }), [selectedSeats]);

	return (
		<SelectedSeatsContext.Provider value={contextValue}>
			<Stack.Navigator>
				<Stack.Screen name="EventDetailsScreen" options={{ headerShown: false }}>
					{(props) => <EventDetailsScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="RoomsPlanStack" options={{ headerShown: false }}>
					{(props) => <RoomsPlanNavigator {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</SelectedSeatsContext.Provider>
	);
};

export default EventsDetailsNavigator;
