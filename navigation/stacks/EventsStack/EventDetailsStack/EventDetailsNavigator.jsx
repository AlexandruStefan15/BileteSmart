import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// context
import { SelectedSeatsContext } from "@/context/SelectedSeatsContext";

//screens
import EventDetailsScreen from "@/screens/EventsStack/EventDetailsStack.jsx/EventDetailsScreen";
import RoomsPlanNavigator from "../../RoomsPlanStack/RoomsPlanNavigator";

const Stack = createStackNavigator();

const EventsDetailsNavigator = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);

	return (
		<SelectedSeatsContext.Provider value={{ selectedSeats, setSelectedSeats }}>
			<Stack.Navigator>
				<Stack.Screen
					name="EventDetailsScreen"
					component={EventDetailsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="RoomsPlanStack"
					component={RoomsPlanNavigator}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</SelectedSeatsContext.Provider>
	);
};

export default EventsDetailsNavigator;
