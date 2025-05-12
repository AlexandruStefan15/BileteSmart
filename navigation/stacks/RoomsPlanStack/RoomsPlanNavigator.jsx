import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// context
import { SelectedSeatsContext } from "@/context/SelectedSeatsContext";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createStackNavigator();

export default RoomsPlanNavigator = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);

	return (
		<SelectedSeatsContext.Provider value={{ selectedSeats, setSelectedSeats }}>
			<Stack.Navigator>
				<Stack.Screen
					name="RoomsPlanScreen"
					component={RoomsPlanScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SeatsPlanScreen"
					component={SeatsPlanScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</SelectedSeatsContext.Provider>
	);
};
