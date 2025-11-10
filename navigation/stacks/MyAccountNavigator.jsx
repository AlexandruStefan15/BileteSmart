import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccountScreen from "@/screens/MyAccountScreen";
import ChangeAccountDataScreen from "@/screens/ChangeAccountDataScreen";
import SavedEventsScreen from "@/screens/SavedEventsScreen";
import LikedLocationsScreen from "@/screens/LikedLocationsScreen";
import SubscriptionsScreen from "@/screens/SubscriptionsScreen";
import ChangePasswordScreen from "@/screens/ChangePasswordScreen";
import DeleteAccountScreen from "@/screens/DeleteAccountScreen";

//navigators
import MyOrdersNavigator from "./MyOrdersNavigator";

const Stack = createNativeStackNavigator();

const MyAccountNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="MyAccountScreen"
			component={MyAccountScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="SubscriptionsScreen"
			component={SubscriptionsScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="ChangeAccountDataScreen"
			component={ChangeAccountDataScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="MyOrdersStack"
			component={MyOrdersNavigator}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="SavedEventsScreen"
			component={SavedEventsScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="LikedLocationsScreen"
			component={LikedLocationsScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="ChangePasswordScreen"
			component={ChangePasswordScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="DeleteAccountScreen"
			component={DeleteAccountScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
);

export default MyAccountNavigator;
