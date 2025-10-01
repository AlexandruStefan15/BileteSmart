import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

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
				variant="2"
				style={{
					backgroundColor: "white",
					boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.34)",
				}}
				styleTitle={{ color: "black", fontSize: 17, fontWeight: "600" }}
				arrowColor="black"
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
