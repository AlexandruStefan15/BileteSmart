import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Header from "@/components/Header";

//data
import { locations } from "@/data/locations"; // to be fetched

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
							<EventCard
								eventData={item}
								onPress={() => /* navigation.navigate("EventDetailsStack", {
										screen: "EventDetailsScreen",
										params: {
											locationId: currentLocation.id,
											event: item,
											currentLocation,
										},
									}) */ {}}
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

	container: { paddingInline: 18, paddingBlock: 22 },
});

export default LocationsScreen;
