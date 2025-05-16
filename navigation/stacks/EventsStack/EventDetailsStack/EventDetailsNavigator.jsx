import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import EventDetailsScreen from "@/screens/EventDetailsScreen";
import RoomsPlanNavigator from "../../RoomsPlanStack/RoomsPlanNavigator";

const Stack = createStackNavigator();

const EventsDetailsNavigator = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);

	return (
		<Stack.Navigator>
			<Stack.Screen name="EventDetailsScreen" options={{ headerShown: false }}>
				{(props) => (
					<EventDetailsScreen
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="RoomsPlanStack" options={{ headerShown: false }}>
				{(props) => (
					<RoomsPlanNavigator
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
					/>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default EventsDetailsNavigator;
