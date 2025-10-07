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
	{ id: 1, title: "Schimba datele", screen: "EditAccountDataScreen", icon: "user", lib: "fa" },
	{ id: 2, title: "Abonamente", screen: "SubscriptionsScreen", icon: "credit-card", lib: "fa" },
	{ id: 3, title: "Istoric comenzi", screen: "OrderHistoryScreen", icon: "history", lib: "fa" },
	{ id: 4, title: "Preferinte", screen: "PreferencesScreen", icon: "settings", lib: "mi" },
	{
		id: 5,
		title: "Schimba parola",
		screen: "ChangePasswordScreen",
		icon: "lock",
		lib: "fa",
	},
	{ id: 6, title: "Sterge contul", screen: "DeleteAccountScreen", icon: "trash", lib: "fa" },
	{ id: 7, title: "Deconectare", screen: "Logout", icon: "logout", lib: "mi" },
];

const NavigationMenu = ({ data = menuItems, style }) => {
	const navigation = useNavigation();

	return (
		<View style={[styles.container, style]}>
			{data.map((item) => {
				const IconComponent = IconLibs[item.lib] || FontAwesome; // fallback
				return (
					<TouchableOpacity
						key={item.id}
						style={styles.item}
						onPress={() => navigation.navigate(item.screen)}
						activeOpacity={0.7}
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
