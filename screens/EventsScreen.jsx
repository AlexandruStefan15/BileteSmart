import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, ActivityIndicator } from "react-native";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//components
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

//data
import { locations } from "@/data/locations"; // to be fetched
import { eventsByLocation } from "@/data/events"; // to be fetched

//store
import { useDrawerStore } from "@/store/store";

const EventsScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	const hasNoEvents = Object.values(eventsByLocation).every(
		(eventsArray) => Array.isArray(eventsArray) && eventsArray.length === 0
	);

	React.useEffect(() => {
		//simulate fetch
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			closeDrawer();
		}, [])
	);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#345772" />
			</View>
		);
	}

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
						const events = eventsByLocation[location.id] || [];
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
															currentLocation: location,
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

	container: { gap: 25, paddingInline: 15, paddingBlock: 21 },

	location_title: {
		fontSize: 19.5,
		fontWeight: "bold",
		marginBottom: 14,
		color: Colors["light"].text.secondary,
		marginLeft: 2,
	},
});

export default EventsScreen;
