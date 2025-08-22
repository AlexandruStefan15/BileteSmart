import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

//constants
import { Colors } from "@/constants/Colors";
//components
import LocationMap from "@/components/LocationMap";

const LocationMapScreen = ({ navigation, route }) => {
	const { coordinates } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			<LocationMap coordinates={coordinates} styleMap={{ height: "100%" }} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},
});

export default LocationMapScreen;
