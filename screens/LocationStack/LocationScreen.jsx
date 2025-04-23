import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image, Button } from "react-native";
import { Colors } from "@/constants";
import { eventLocations } from "@/data/locations";

import Header from "@/components/Header";
import Title from "@/components/Title";

const LocationScreen = ({ navigation, route }) => {
	const { locationId } = route.params;
	const currentLocation = eventLocations.find((location) => location.id === locationId);

	/* useFocusEffect(
		React.useCallback(() => {
			navigation.popToTop();

			return () => {
				console.log("Screen is unfocused (blurred)");
			};
		}, [])
	);
 */
	return (
		<SafeAreaView style={styles.screen}>
			<Header backButtonColor="white" variant="2" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.bannerImage}>
					<Image
						source={currentLocation.images[1]}
						style={{ width: "100%", height: "100%", resizeMode: "cover" }}
					/>
				</View>
				<View style={styles.content}>
					<Title style={styles.title}>{currentLocation.name}</Title>
					{currentLocation.info && (
						<View style={styles.info}>
							{Object.entries(currentLocation.info).map(([key, value]) => (
								<Text style={styles.infoText} key={key}>
									{value}
								</Text>
							))}
						</View>
					)}
					{currentLocation.description && (
						<Text style={styles.description}>{currentLocation.description}</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
		position: "relative",
	},

	bannerImage: {
		position: "relative",
		maxHeight: 340,
	},

	content: {
		flex: 1,
		borderRadius: 21,
		backgroundColor: "white",
		marginTop: -35,
		backgroundColor: Colors["light"].background.primary,
		padding: 20,
	},

	title: {
		marginTop: 7,
		paddingInline: 15,
		borderBottomWidth: 1,
		paddingBottom: 25,
		fontSize: 22,
	},

	info: {
		marginTop: 5,

		gap: 10,
	},

	infoText: {
		fontSize: 16,
	},

	description: {
		marginTop: 20,
		fontSize: 16,
	},
});

export default LocationScreen;
