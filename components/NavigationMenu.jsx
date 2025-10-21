import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// icons
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const IconLibs = {
	fa: FontAwesome,
	mi: MaterialIcons,
	io: Ionicons,
	en: Entypo,
};

const menuItems = [
	{
		id: 1,
		title: "Schimba datele",
		screen: "ChangeAccountDataScreen",
		icon: "user",
		iconLib: "fa",
	},
	{ id: 2, title: "Abonamente", screen: "SubscriptionsScreen", icon: "credit-card", iconLib: "fa" },
	{ id: 3, title: "Istoric comenzi", screen: "OrderHistoryScreen", icon: "history", iconLib: "fa" },
	{
		id: 4,
		title: "Evenimente salvate",
		screen: "SavedEventsScreen",
		icon: "bookmark-o",
		iconLib: "fa",
	},
	{
		id: 5,
		title: "Schimbă parola",
		screen: "ChangePasswordScreen",
		icon: "lock",
		iconLib: "fa",
	},
	{ id: 6, title: "Sterge contul", screen: "DeleteAccountScreen", icon: "trash", iconLib: "fa" },
	{ id: 7, title: "Deconectare", screen: "Logout", icon: "logout", iconLib: "mi" },
];

const NavigationMenu = ({ data = menuItems, style, ...props }) => {
	const navigation = useNavigation();

	return (
		<View style={[styles.container, style]} {...props}>
			{data.map((item) => {
				const IconComponent = IconLibs[item.iconLib] || FontAwesome; // fallback
				return (
					<TouchableOpacity
						key={item.id}
						style={styles.item}
						onPress={() => navigation.navigate(item.screen)}
					>
						<View style={styles.left}>
							<IconComponent name={item.icon} size={20} color="#000" />
						</View>
						<View style={styles.middle}>
							<Text style={styles.title}>{item.title}</Text>
						</View>
						<View style={styles.right}>
							<MaterialIcons name="chevron-right" size={20} color="#000" />
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingVertical: 6,
		gap: 2,
		// Shadow for iOS
		shadowColor: "#000",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 10,
		justifyContent: "space-between",
	},
	left: {
		width: 28,
		height: 28,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
	},

	middle: {
		flex: 1,
		paddingHorizontal: 10,
	},

	title: {
		fontSize: 16,
	},
});

export default NavigationMenu;
