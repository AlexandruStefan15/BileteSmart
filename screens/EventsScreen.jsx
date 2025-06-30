import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image } from "react-native";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//components
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

//data
import { locations } from "@/data/locations"; // to be fetched

//hooks
import { useEventsByLocation } from "@/hooks/useEventsByLocation";

//store
import { useDrawerStore } from "@/store/store";

const EventsScreen = ({ navigation }) => {
	const { eventsGrouped } = useEventsByLocation();

	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			// On focus, close the drawer
			closeDrawer();
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Home" />
			<ScrollView>
				<View style={styles.container}>
					{locations.map((location) => {
						const events = eventsGrouped[location.id] || [];

						return (
							<View key={location.id}>
								<Text style={styles.location_title}>{location.name}</Text>
								{events.length > 0 ? (
									events.map((event) => (
										<EventCard
											variant="2"
											onPress={() =>
												navigation.navigate("EventDetailsStack", {
													screen: "EventDetailsScreen",
													params: {
														locationId: location.id,
														event: event,
														locationFieldPath: location.field_path_d,
													},
												})
											}
											key={event.id_event}
											eventData={event}
										/>
									))
								) : (
									<Text style={{ fontStyle: "italic", color: "gray", marginTop: 0 }}>
										Niciun eveniment disponibil.
									</Text>
								)}
							</View>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},

	container: { gap: 45, padding: 16, paddingBlock: 35 },

	location_title: {
		fontSize: 20.5,
		fontWeight: "bold",
		marginBottom: 12,
		color: Colors.primary,
	},
});

export default EventsScreen;
