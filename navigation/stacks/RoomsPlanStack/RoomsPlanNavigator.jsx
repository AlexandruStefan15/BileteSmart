import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import RoomsPlanScreen from "@/screens/RoomsPlanScreen";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";

const Stack = createStackNavigator();

export default function RoomsPlanNavigator({ selectedSeats, setSelectedSeats }) {
	const [showBadge, setShowBadge] = useState(false);

	return (
		<Stack.Navigator>
			<Stack.Screen name="RoomsPlanScreen" options={{ headerShown: false }}>
				{(props) => (
					<RoomsPlanScreen
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
						showBadge={showBadge}
						setShowBadge={setShowBadge}
					/>
				)}
			</Stack.Screen>

			<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
				{(props) => (
					<SeatsPlanScreen
						{...props}
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
						showBadge={showBadge}
						setShowBadge={setShowBadge}
					/>
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
