import React from "react";
import {
	StyleSheet,
	View,
	Text,
	Platform,
	Dimensions,
	Image,
	TouchableOpacity,
} from "react-native";
import { images } from "@/assets/images";
import { Colors } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";

const HeroBanner = () => {
	const windowHeight = Dimensions.get("window").height;

	return (
		<View style={[styles.section, { height: windowHeight - 132 }]}>
			<Image source={images.heroBanner} style={styles.backgroundImage} />
			<LinearGradient
				colors={["rgba(54,87,113,0.9)", "rgba(168,169,172,0.9)"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradient}
			>
				<View style={[styles.container]}>
					<Text style={styles.title}>
						Poți cumpăra bilete pentru sala ta Polivalentă preferată direct de aici!
					</Text>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Vezi evenimente</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		position: "relative",
		marginTop: Platform.OS === "web" ? 73 : 0,
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
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 30,
	},

	buttonText: {
		color: "white",
		fontSize: 18,
	},

	title: {
		color: "white",
		fontSize: 28,
		textAlign: "center",
		paddingInline: 20,
		lineHeight: 37,
		fontWeight: 300,
	},
});

export default HeroBanner;
