import React from "react";
import { StyleSheet, View, Text, Image, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { images } from "@/assets/images";
import { Colors } from "@/constants";
import Button from "../Button";

const HeroBanner = () => {
	const { navigate } = useNavigation();
	const headerHeight = 68;
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { height: safeFrameHeight } = useSafeAreaFrame();

	const sectionHeight = safeFrameHeight - headerHeight - bottomTabBarHeight;

	return (
		<View style={[styles.section, { height: sectionHeight }]}>
			<Image source={images.heroBanner} style={styles.backgroundImage} />
			<LinearGradient
				colors={["rgba(54,87,113,0.9)", "rgba(168,169,172,0.9)"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradient}
			>
				<View style={styles.container}>
					<Text style={styles.title}>
						Poți cumpăra bilete pentru sala ta Polivalentă preferată direct de aici!
					</Text>
					<Button
						style={styles.button}
						styleText={styles.buttonText}
						onPress={() => navigate("Evenimente")}
					>
						Vezi evenimente
					</Button>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		position: "relative",
	},
	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	gradient: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		gap: 25,
	},
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 16,
		paddingHorizontal: 30,
		borderRadius: 30,
	},
	buttonText: {
		color: "white",
		fontSize: 18.5,
	},
	title: {
		color: "white",
		fontSize: 28,
		textAlign: "center",
		paddingHorizontal: 20,
		lineHeight: 37,
		fontWeight: "300",
	},
});

export default HeroBanner;
