import React from "react";
import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//constants
import { Colors } from "@/constants";

//store
import { useLikedLocationsStore } from "@/store";

//components
import Header from "@/components/Header";
import LocationCard from "@/components/LocationCard";

const LikedLocationsScreen = ({ navigation, route }) => {
	const likedLocations = useLikedLocationsStore((s) => s.likedLocations);

	if (likedLocations.length == 0)
		return (
			<SafeAreaView style={styles.screen}>
				<Header title={"Locatii preferate"} variant="3" arrowColor="black" backButtonSize={24.5} />
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Nu aveti locatii preferate.</Text>
				</View>
			</SafeAreaView>
		);

	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Locatii preferate"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<FlatList
				data={likedLocations}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
				keyExtractor={(location) => location.id.toString()}
				renderItem={({ item: location }) => (
					<LocationCard
						location={location}
						onPress={() =>
							setTimeout(() => {
								navigation.navigate("LocationStack", {
									screen: "LocationScreen",
									params: { currentLocation: location },
								});
							}, 40)
						}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background,
	},

	list: {},

	contentContainerList: {},
});

export default LikedLocationsScreen;
