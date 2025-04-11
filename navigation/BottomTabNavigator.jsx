import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactScreen_stack from "./stacks/ContactScreen_stack";
import HomeScreen_stack from "./stacks/HomeScreen_stack";

import Icon from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
	<Tab.Navigator
		screenOptions={{
			headerShown: false,
			tabBarShowLabel: true,
			tabBarActiveTintColor: "rgb(224 74 132)",
			tabBarInactiveTintColor: "gray",
			tabBarStyle: { minHeight: 60, paddingTop: 5 },
		}}
	>
		<Tab.Screen
			name="Acasa"
			component={HomeScreen_stack}
			options={{
				tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
			}}
		/>

		<Tab.Screen
			name="Evenimente"
			component={ContactScreen_stack}
			options={{
				tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
			}}
		/>

		<Tab.Screen
			name="Ticketing"
			component={ContactScreen_stack}
			options={{
				tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
			}}
		/>
	</Tab.Navigator>
);

export default BottomTabNavigator;
