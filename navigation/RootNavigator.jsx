import React from "react";
import { View, Platform, StatusBar as bar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import { StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";

const Stack = createStackNavigator();

const RootNavigator = () => {
	const { theme } = useTheme();

	return (
		<NavigationContainer>
			<StatusBar
				barStyle={theme == "dark" ? "light-content" : "dark-content"}
				backgroundColor={theme == "dark" ? "black" : "white"}
			/>
			{/* <View
				style={{
					backgroundColor: "black",
					height: Platform.OS === "android" ? bar.currentHeight : 0,
				}}
			>
				<StatusBar barStyle={"light-content"} />
			</View> */}
			<Stack.Navigator>
				<Stack.Screen
					name="Tabs"
					component={BottomTabNavigator}
					options={{ /* header: () => <Header />, */ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
