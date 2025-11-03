import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeatsPlanScreen from "@/screens/SeatsPlanScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";

const Stack = createNativeStackNavigator();

const SeatsPlanNavigator = forwardRef(({ ...props }, ref) => {
	const seatsPlanRef = useRef();

	useImperativeHandle(ref, () => ({
		// expose methods from SeatsPlanScreen upward
		closeBottomSheet: () => seatsPlanRef.current?.closeBottomSheet(),
	}));

	return (
		<Stack.Navigator>
			<Stack.Screen name="SeatsPlanScreen" options={{ headerShown: false }}>
				{(navProps) => (
					<SeatsPlanScreen
						{...navProps}
						ref={seatsPlanRef}
						seatCount={props.seatCount}
						badgeStyle={props.badgeStyle}
						displayBadge={props.displayBadge}
						openSidebar={props.openSidebar}
						infoModalShowedOnce={props.infoModalShowedOnce}
						setInfoModalShowedOnce={props.setInfoModalShowedOnce}
						sharedTopAnimation={props.sharedTopAnimation}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="CheckoutScreen" options={{ headerShown: false }}>
				{(navProps) => <CheckoutScreen {...navProps} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
});

export default SeatsPlanNavigator;
