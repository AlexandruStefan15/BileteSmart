import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { images } from "@/assets/images";
import { Colors } from "@/constants";

const Header = ({ title = false, logo = images.logo, style }) => {
	const navigation = useNavigation();

	return (
		<Animated.View style={[styles.container, style]}>
			<TouchableOpacity style={styles.burgerMenu}>
				<View style={styles.burgerMenu_icon}>
					<FeatherIcon name="align-left" size={25} />
				</View>
			</TouchableOpacity>
			{logo && (
				<View style={{ width: 120, height: 35 }}>
					<Image
						source={logo}
						style={{
							width: "100%",
							height: "100%",
							resizeMode: "contain",
						}}
					/>
				</View>
			)}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "fixed",
		flexDirection: "row-reverse",
		paddingHorizontal: 20,
		paddingVertical: 14,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "white",
		zIndex: 10,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},

	burgerMenu_icon: {
		padding: 8,
		borderRadius: 10,
		backgroundColor: Colors.light.background.primary,
		left: 1,
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: "auto",
	},
});

export default Header;
