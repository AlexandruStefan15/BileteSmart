import React from "react";
import {
	StyleSheet,
	View,
	Text,
	Platform,
	Dimensions,
	Image,
	Button,
} from "react-native";
import { images } from "@/assets/images";

const HeroBanner = () => {
	const windowHeight = Dimensions.get("window").height;

	return (
		<View style={[styles.section, { height: windowHeight - 136 }]}>
			<Image source={images.heroBanner} style={styles.backgroundImage} />
			<View style={[styles.container]}>
				{/* <Text style={styles.caption}>Poți cumpăra bilete pentru</Text> */}
				<Text style={styles.title}>
					Poți cumpăra bilete pentru sala ta Polivalentă preferată direct de aici!
				</Text>
				<Button title="Cumpără bilete" onPress={() => alert("Bilete cumpărate!")} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		backgroundColor: "blue",
		position: "relative",
		marginTop: Platform.OS === "web" ? 73 : 0,
	},

	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0.5,
		resizeMode: "cover",
	},

	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		gap: 25,
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
