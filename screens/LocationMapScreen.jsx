import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//constants
import { Colors } from "@/constants/Colors";
//components
import LocationMap from "@/components/LocationMap";
import Header from "@/components/Header";

const LocationMapScreen = ({ navigation, route }) => {
	const { coordinates, address } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			<Header
				title={address}
				variant="3"
				styleTitle={{ color: "black", fontSize: 16, fontWeight: "600" }}
				arrowColor="black"
				backButtonSize={24.5}
			/>
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
