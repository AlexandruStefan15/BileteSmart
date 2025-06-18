import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image } from "react-native";
import { Colors } from "@/constants";

//components
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

//data
import { locations } from "@/data/locations"; // to be fetched

//hooks
import { useEventsByLocation } from "@/hooks/useEventsByLocation";

const EventsScreen = ({ navigation }) => {
	const { eventsGrouped } = useEventsByLocation();

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Home" />
			<ScrollView>
				<View style={{ gap: 45, padding: 16, paddingBlock: 35 }}>
					{locations.map((location) => {
						const events = eventsGrouped[location.id] || [];

						return (
							<View key={location.id}>
								<Text
									style={{
										fontSize: 20.5,
										fontWeight: "bold",
										marginBottom: 12,
										color: Colors.primary,
									}}
								>
									{location.name}
								</Text>

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
});

export default EventsScreen;
