import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

const Header = ({ title = false, style }) => {
	const navigation = useNavigation();

	return (
		<Animated.View style={[styles.container, style]}>
			<TouchableOpacity
				style={styles.burgerMenu} /* onPress={() => navigation.openDrawer()} */
			>
				<View style={styles.burgerMenu_icon}>
					<FeatherIcon name="align-left" size={22} />
				</View>
			</TouchableOpacity>
			{title && <Text style={styles.title}>{title}</Text>}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flexDirection: "row",
		paddingInline: 25,
		paddingBlock: 20,
		alignItems: "center",
	},

	burgerMenu: {
		position: "absolute",
		left: 25,
	},

	burgerMenu_icon: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginInline: "auto",
	},
});

export default Header;
