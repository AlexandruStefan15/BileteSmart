import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, FlatList, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//store
import { useDrawerStore } from "@/store/store";

//data
import { locations } from "@/data/locations"; // to be fetched

//components
import Header from "@/components/Header";
import LocationCard from "@/components/LocationCard";

const LocationsScreen = ({ route, navigation }) => {
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			closeDrawer();
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<FlatList
						contentContainerStyle={styles.locationList}
						data={locations}
						scrollEnabled={false}
						keyExtractor={(item) => item.id}
						renderItem={({ item, index }) => (
							<LocationCard
								location={item}
								onPress={() =>
									setTimeout(() => {
										navigation.navigate("LocationStack", {
											screen: "LocationScreen",
											params: { currentLocation: item },
										});
									}, 50)
								}
							/>
						)}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},

	container: { paddingInline: 0, paddingBlock: 0 },
});

export default LocationsScreen;
