import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { images } from "@/assets/images";
import { Colors } from "@/constants";

const Header = ({
	title = false,
	logo = images.logo,
	showBurgerMenu = true,
	variant = "",
	style,
}) => {
	const navigation = useNavigation();

	if (variant == 3)
		return (
			<Animated.View style={[styles.container3, style]}>
				<View style={styles.backButton}>
					<TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
						<FeatherIcon name="arrow-left" size={26} color={"white"} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.burgerMenu}>
					<View style={{ padding: 5, right: -1 }}>
						<AntDesignIcon name="bars" size={28} color={"white"} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		);

	if (variant == 2)
		return (
			<Animated.View style={[styles.container2, style]}>
				<View style={styles.backButton}>
					<TouchableOpacity
						style={{ padding: 20, left: -20, top: -18 }}
						onPress={() => navigation.goBack()}
					>
						<FeatherIcon name="arrow-left" size={26} color={Colors.dark.text.primary} />
					</TouchableOpacity>
				</View>
			</Animated.View>
		);

	return (
		<Animated.View style={[styles.container, style]}>
			{showBurgerMenu && (
				<TouchableOpacity style={styles.burgerMenu}>
					<View style={styles.burgerMenu_icon}>
						<FeatherIcon name="align-left" size={25} />
					</View>
				</TouchableOpacity>
			)}
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
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: "auto",
	},

	// variant 2 styles

	container2: {
		position: "absolute",
		top: 0,
		flexDirection: "row-reverse",
		paddingHorizontal: 20,
		paddingVertical: 14,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: "transparent",
	},

	backButton: {
		marginRight: "auto",
	},

	// variant 3 styles

	container3: {
		position: "absolute",
		top: 0,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 12,
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10,
		width: "100%",
		backgroundColor: Colors.tertiary,
	},
});

export default Header;
