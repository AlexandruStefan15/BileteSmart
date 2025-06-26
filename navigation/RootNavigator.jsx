import React from "react";
import { View, Platform, StatusBar as bar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import { StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { navigationRef } from "./navigationRef";

//stacks
import EventDetailsNavigator from "./stacks/EventsStack/EventDetailsStack/EventDetailsNavigator";

//screens
import HomeScreen from "@/screens/HomeScreen";
import EventsScreen from "@/screens/EventsScreen";
import ContactScreen from "@/screens/ContactScreen";
import TicketingScreen from "@/screens/TicketingScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigator = () => {
	const { theme } = useTheme();

	return (
		<NavigationContainer ref={navigationRef}>
			<StatusBar
				/* barStyle={theme == "dark" ? "light-content" : "dark-content"}
				backgroundColor={theme == "dark" ? "black" : "white"} */
				barStyle={"dark-content"}
				backgroundColor={"white"}
			/>
			<Stack.Navigator>
				<Stack.Screen
					name="Tabs"
					component={BottomTabNavigator}
					options={{ /* header: () => <Header />, */ headerShown: false }}
				/>
				<Stack.Screen
					name="EventDetailsStack"
					component={EventDetailsNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Contact" component={ContactScreen} />
				<Stack.Screen name="Ticketing" component={TicketingScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
