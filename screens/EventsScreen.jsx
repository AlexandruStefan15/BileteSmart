import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image } from "react-native";
import { Colors } from "@/constants";

//components
import Header from "@/components/Header";
import Ripple from "react-native-material-ripple";

//data
import { locations } from "@/data/locations"; // to be fetched

//hooks
import { useEventsByLocation } from "@/hooks/useEventsByLocation";

const EventsScreen = ({ navigation }) => {
	const { eventsGrouped } = useEventsByLocation();

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Home" />
			<ScrollView style={{ padding: 16 }}>
				{locations.map((location) => {
					const events = eventsGrouped[location.id] || [];

					return (
						<View key={location.id} style={{ marginBottom: 32 }}>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>{location.name}</Text>

							{events.length > 0 ? (
								events.map((event) => (
									<View key={event.id_event} style={{ marginVertical: 12 }}>
										<Ripple
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
											rippleColor="white"
											rippleDuration={320}
											rippleCentered={false}
										>
											<Image
												source={{ uri: event.event_img }}
												style={{ height: 245, borderRadius: 12 }}
												resizeMode="cover"
											/>
										</Ripple>
										<Text style={{ fontSize: 16 }}>{event.title}</Text>
										<Text style={{ color: "gray" }}>
											{event.date} @ {event.time}
										</Text>
									</View>
								))
							) : (
								<Text style={{ fontStyle: "italic", color: "gray", marginTop: 8 }}>
									Niciun eveniment disponibil.
								</Text>
							)}
						</View>
					);
				})}
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
