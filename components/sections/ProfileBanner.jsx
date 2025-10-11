import React from "react";
import { StyleSheet, View, Image, Text, Pressable, Dimensions } from "react-native";

//icons
import FeatherIcon from "react-native-vector-icons/Feather";

const ProfileBanner = () => {
	const windowHeight = Dimensions.get("window").height;

	return (
		<View style={styles.section}>
			<View style={styles.settingsButton}>
				<Pressable onPress={() => {}}>
					<FeatherIcon name="settings" size={24.5} color="#000" />
				</Pressable>
			</View>
			<View style={styles.container}>
				<View style={styles.imageBox}>
					<Image
						source={require("@/assets/images/myAccount.png")}
						style={{ width: "100%", height: "100%", resizeMode: "contain", postion: "absolute" }}
					/>
				</View>
				<Text style={styles.profileName}>My Account</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		paddingVertical: 55,
		backgroundColor: "#edededff",
	},

	settingsButton: {
		position: "absolute",
		top: 20,
		right: 23,
	},

	container: {
		alignItems: "center",
		gap: 15,
	},

	imageBox: {
		position: "relative",
		width: 98,
		height: 98,
		overflow: "hidden",
		borderRadius: 20,
	},

	profileName: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default ProfileBanner;
