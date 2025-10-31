import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// Constants
import { Colors } from "@/constants";
// Navigators
import EventsNavigator from "./stacks/EventsNavigator";
import HomeNavigator from "./stacks/HomeNavigator";
import MyAccountNavigator from "./stacks/MyAccountNavigator";
import LocationsNavigator from "./stacks/LocationsNavigator";
// Components
import Icon from "@/components/Icon";

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
					tabBarIcon: ({ color, size }) => <Icon lib="fe" name="home" size={size} color={color} />,
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
					tabBarIcon: ({ color, size }) => <Icon lib="mi" name="event" size={size} color={color} />,
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
			<Tab.Screen //Locations
				name="Locatii"
				component={LocationsNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "LocationsScreen"),
					tabBarIcon: ({ color, size }) => (
						<Icon lib="fa6" name="map-location-dot" size={size} color={color} />
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
							navigation.navigate("Locatii", {
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
					tabBarIcon: ({ color, size }) => <Icon lib="fa" name="user" size={size} color={color} />,
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
