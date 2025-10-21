import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// Constants
import { Colors } from "@/constants";
// Navigators
import EventsNavigator from "./stacks/EventsStack/EventsNavigator";
import HomeNavigator from "./stacks/HomeStack/HomeNavigator";
import TicketsNavigator from "./stacks/TicketsNavigator";
import MyAccountNavigator from "./stacks/MyAccountNavigator";
// Icons
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const getTabBarStyle = (route, rootScreenName) => {
	/* const focusedRoute = getFocusedRouteNameFromRoute(route);

	if (focusedRoute && focusedRoute !== rootScreenName) {
		return {
			display: "none",
		};
	} */

	return { minHeight: 63, paddingTop: 5, backgroundColor: "white" };
};

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tab.Screen
				name="Acasa"
				component={HomeNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "HomeScreen"),
					tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: true,
				})}
				listeners={({ navigation, route }) => ({
					tabPress: () => {
						const state = route.state;
						if (state && state.routes.length > 1) {
							// stack has more than 1 screen => pop to top
							navigation.navigate("Acasa", {
								screen: state.routes[0].name,
							});
						}
					},
				})}
			/>
			<Tab.Screen
				name="Evenimente"
				component={EventsNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "EventsScreen"),
					tabBarIcon: ({ color, size }) => <MaterialIcon name="event" size={size} color={color} />,
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: true,
				})}
				listeners={({ navigation, route }) => ({
					tabPress: () => {
						const state = route.state;
						if (state && state.routes.length > 1) {
							// stack has more than 1 screen => pop to top
							navigation.navigate("Evenimente", {
								screen: state.routes[0].name,
							});
						}
					},
				})}
			/>
			<Tab.Screen
				name="Bilete"
				component={TicketsNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "TicketsScreen"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon name="ticket" size={size} color={color} />
					),
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: true,
				})}
				listeners={({ navigation, route }) => ({
					tabPress: () => {
						const state = route.state;
						if (state && state.routes.length > 1) {
							// stack has more than 1 screen => pop to top
							navigation.navigate("Bilete", {
								screen: state.routes[0].name,
							});
						}
					},
				})}
			/>
			<Tab.Screen
				name="Contul meu"
				component={MyAccountNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "MyAccountScreen"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon name="user" size={size} color={color} />
					),
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: true,
				})}
				listeners={({ navigation, route }) => ({
					tabPress: () => {
						const state = route.state;
						if (state && state.routes.length > 1) {
							// stack has more than 1 screen => pop to top
							navigation.navigate("Contul meu", {
								screen: state.routes[0].name,
							});
						}
					},
				})}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
