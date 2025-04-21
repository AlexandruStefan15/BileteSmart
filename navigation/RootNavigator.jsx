import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import { StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";

import EventScreen from "@/screens/EventScreen";
import LocationScreen from "@/screens/LocationScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
	const { theme } = useTheme();

	return (
		<NavigationContainer>
			<StatusBar
				barStyle={theme == "dark" ? "light-content" : "dark-content"}
				backgroundColor={theme == "dark" ? "black" : "white"}
			/>
			<Stack.Navigator>
				<Stack.Screen
					name="Tabs"
					component={BottomTabNavigator}
					options={{ /* header: () => <Header />, */ headerShown: false }}
				/>
				<Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: false }} />
				<Stack.Screen
					name="LocationScreen"
					component={LocationScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
