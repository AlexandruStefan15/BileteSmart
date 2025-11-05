import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { locations } from "@/data/locations";
import Ripple from "react-native-material-ripple";

const LocationCard = ({ location = locations[0], onPress }) => {
	return (
		<View style={styles.container}>
			<Ripple
				onPress={onPress}
				style={styles.listItem}
				rippleColor="white"
				rippleDuration={285}
				rippleCentered={false}
			>
				<Image source={location.images.banner} style={styles.img} />
				<View style={styles.details}>
					<Text style={styles.title}>{location.name}</Text>
					<Text style={styles.subtitle}>{location.city}</Text>
				</View>
				<LinearGradient
					colors={["#0000007a", "#0000000c"]}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
					style={styles.gradientOverlay}
				/>
			</Ripple>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { position: "relative" },

	img: {
		width: "100%",
		height: 302,
		resizeMode: "cover",
	},

	details: {
		position: "absolute",
		bottom: 26,
		left: 20,
		zIndex: 99,
		gap: 2,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},

	subtitle: {
		fontSize: 16,
		fontWeight: 400,
		color: "white",
	},

	gradientOverlay: {
		position: "absolute",
		zIndex: 9,
		height: "100%",
		width: "100%",
	},
});

export default LocationCard;
