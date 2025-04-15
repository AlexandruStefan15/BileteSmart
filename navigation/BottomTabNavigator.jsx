import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactScreen_stack from "./stacks/ContactScreen_stack";
import HomeScreen_stack from "./stacks/HomeScreen_stack";

import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
	<Tab.Navigator
		screenOptions={{
			headerShown: false,
			tabBarShowLabel: true,
			tabBarActiveTintColor: "#3b6f98",
			tabBarInactiveTintColor: "gray",
			tabBarStyle: { minHeight: 63, paddingTop: 5 },
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
				tabBarIcon: ({ color, size }) => (
					<MaterialIcon name="event" size={size} color={color} />
				),
			}}
		/>

		<Tab.Screen
			name="Bilete"
			component={ContactScreen_stack}
			options={{
				tabBarIcon: ({ color, size }) => (
					<FontAwesomeIcon name="ticket" size={size} color={color} />
				),
			}}
		/>

		<Tab.Screen
			name="Profil"
			component={ContactScreen_stack}
			options={{
				tabBarIcon: ({ color, size }) => (
					<FontAwesomeIcon name="user" size={size} color={color} />
				),
			}}
		/>
	</Tab.Navigator>
);

export default BottomTabNavigator;
