import React from "react";
import { StyleSheet, View, Image, Text, Pressable, Dimensions } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

//icons
import FeatherIcon from "react-native-vector-icons/Feather";

const ProfileBanner = ({ settingsButton }) => {
	const windowHeight = Dimensions.get("window").height;
	const { height: safeFrameHeight } = useSafeAreaFrame();
	const styles = getStyles(safeFrameHeight);

	return (
		<View style={styles.section}>
			<View style={styles.settingsButton}>
				{settingsButton && (
					<Pressable onPress={() => {}}>
						<FeatherIcon name="settings" size={24.5} color="#000" />
					</Pressable>
				)}
			</View>
			<View style={styles.container}>
				<View style={styles.imageBox}>
					<Image
						source={require("@/assets/images/myAccount.png")}
						style={{ width: "100%", height: "100%", resizeMode: "contain", postion: "absolute" }}
					/>
				</View>
				<Text style={styles.profileName}>Alex Nastase</Text>
			</View>
		</View>
	);
};

const getStyles = (safeFrameHeight) =>
	StyleSheet.create({
		section: {
			paddingVertical: (55 * safeFrameHeight) / 800 < 55 ? (54 * safeFrameHeight) / 800 : 64,
			backgroundColor: "#edededff",
		},

		settingsButton: {
			position: "absolute",
			top: 20,
			right: 23,
		},

		container: {
			alignItems: "center",
			gap: 14,
		},

		imageBox: {
			position: "relative",
			width: 100,
			height: 100,
			overflow: "hidden",
			borderRadius: 20,
		},

		profileName: {
			fontSize: 18,
			fontWeight: "bold",
		},
	});

export default ProfileBanner;
