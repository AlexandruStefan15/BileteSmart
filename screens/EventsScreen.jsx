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

	const hasNoEvents = Object.values(eventsGrouped).every(
		(eventsArray) => Array.isArray(eventsArray) && eventsArray.length === 0
	);

	useFocusEffect(
		React.useCallback(() => {
			closeDrawer();
		}, [])
	);

	if (hasNoEvents) {
		return (
			<SafeAreaView style={styles.screen}>
				<Header />
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
						<Text style={styles.location_title}>No events available</Text>
						{/* Optional: add an image */}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView>
				<View style={styles.container}>
					{locations.map((location) => {
						const events = eventsGrouped[location.id] || [];
						if (events.length == 0) {
							return null;
						}
						return (
							<View key={location.id}>
								{events.length > 0 &&
									events.map((event) => (
										<React.Fragment key={event.id_event}>
											<Text style={styles.location_title}>{location.name}</Text>
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
												eventData={event}
											/>
										</React.Fragment>
									))}
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

	container: { gap: 25, paddingInline: 15, paddingBlock: 35 },

	location_title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 12,
		color: Colors.primary,
		marginLeft: 2,
	},
});

export default EventsScreen;
