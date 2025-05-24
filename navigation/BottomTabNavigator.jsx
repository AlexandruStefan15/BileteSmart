import React, { useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions, CommonActions } from "@react-navigation/native";
import { Colors } from "@/constants";

//navigators
import EventsNavigator from "./stacks/EventsStack/EventsNavigator";
import HomeNavigator from "./stacks/HomeStack/HomeNavigator";
import TicketsNavigator from "./stacks/TicketsStack/TicketsNavigator";
import ProfileNavigator from "./stacks/ProfileStack/ProfileNavigator";

//icons
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: Colors.primary,
				tabBarInactiveTintColor: "gray",
				tabBarStyle: {
					minHeight: 63,
					paddingTop: 4,
					backgroundColor: /* "#f7f7f7" */ "white",
				},
				gestureEnabled: true,
			}}
		>
			<Tab.Screen
				name="Acasa"
				options={{
					tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
				}}
			>
				{() => <HomeNavigator />}
			</Tab.Screen>

			<Tab.Screen
				name="Evenimente"
				component={EventsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialIcon name="event" size={size} color={color} />,
				}}
			/>

			<Tab.Screen
				name="Bilete"
				component={TicketsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon name="ticket" size={size} color={color} />
					),
				}}
			/>

			<Tab.Screen
				name="Profil"
				component={ProfileNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcon name="user" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
