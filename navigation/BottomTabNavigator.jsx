import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Colors } from "@/constants";

// Navigators
import EventsNavigator from "./stacks/EventsStack/EventsNavigator";
import HomeNavigator from "./stacks/HomeStack/HomeNavigator";
import TicketsNavigator from "./stacks/TicketsStack/TicketsNavigator";
import ProfileNavigator from "./stacks/ProfileStack/ProfileNavigator";

// Icons
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const getTabBarStyle = (route, rootScreenName) => {
	const focusedRoute = getFocusedRouteNameFromRoute(route);

	/* if (focusedRoute && focusedRoute !== rootScreenName) {
		return {
			display: "none",
		};
	} */
	return { minHeight: 63, paddingTop: 4, backgroundColor: "white" };
};

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
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
			/>
			<Tab.Screen
				name="Profil"
				component={ProfileNavigator}
				options={({ route }) => ({
					tabBarStyle: getTabBarStyle(route, "ProfileScreen"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon name="user" size={size} color={color} />
					),
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: true,
				})}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
