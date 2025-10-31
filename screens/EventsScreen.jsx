import React from "react";
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//components
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

//data
import { events } from "@/data/events"; // to be fetched

//store
import { useDrawerStore } from "@/store";

const EventsScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);
	const hasNoEvents = events.length == 0;

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
			<FlatList
				data={events}
				keyExtractor={(event) => event.id_event.toString()}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
				renderItem={({ item: event }) => (
					<EventCard
						eventData={event}
						variant="2"
						onPress={() => {
							navigation.navigate("EventDetailsStack", {
								screen: "EventDetailsScreen",
								params: {
									event,
								},
							});
						}}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},

	list: { paddingInline: 18 },

	contentContainerList: {
		gap: 17,
		paddingBlock: 17,
	},

	location_title: {
		fontSize: 19.5,
		fontWeight: "bold",
		marginBottom: 14,
		color: Colors["light"].text.secondary,
		marginLeft: 2,
	},
});

export default EventsScreen;
