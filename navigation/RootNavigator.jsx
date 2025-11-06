import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import { navigationRef } from "./navigationRef";

//hooks
import { useTheme } from "../hooks/useTheme";
//stacks
import EventDetailsNavigator from "./stacks/EventDetailsNavigator";
import MyOrdersNavigator from "./stacks/MyOrdersNavigator";
import LocationNavigator from "./stacks/LocationNavigator";
//screens
import ContactScreen from "@/screens/ContactScreen";
import TicketingScreen from "@/screens/TicketingScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
//components
import CustomDrawer from "@/components/CustomDrawer";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const { theme } = useTheme();
	//only componentes inside Stack.Navigator can use useNavigation(), this is why i use navigationRef for CustomDrawer
	return (
		<NavigationContainer ref={navigationRef}>
			<StatusBar
				/* barStyle={theme == "dark" ? "light-content" : "dark-content"}
				backgroundColor={theme == "dark" ? "black" : "white"} */
				barStyle={"dark-content"}
				backgroundColor={"white"}
			/>
			<View style={styles.wrapper}>
				<Stack.Navigator>
					<Stack.Screen
						name="Tabs"
						component={BottomTabNavigator}
						options={{ /* header: () => <Header />, */ headerShown: false }}
					/>
					<Stack.Screen // placed here in order to hide bottomTabNavigator
						name="EventDetailsStack"
						component={EventDetailsNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen // placed here in order to hide bottomTabNavigator
						name="LocationStack"
						component={LocationNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="CheckoutScreen"
						component={CheckoutScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="Contact" component={ContactScreen} />
					<Stack.Screen name="Ticketing" component={TicketingScreen} />
				</Stack.Navigator>
				<CustomDrawer />
			</View>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		position: "relative", // allows CustomDrawer to be positioned absolutely
	},
});

export default RootNavigator;
