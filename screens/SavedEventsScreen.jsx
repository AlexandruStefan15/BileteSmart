import React from "react";
import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//constants
import { Colors } from "@/constants";

//store
import { useSavedEventsStore } from "@/store";

//components
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";

const SavedEventsScreen = ({ navigation, route }) => {
	const savedEvents = useSavedEventsStore((s) => s.savedEvents);

	if (savedEvents.length == 0)
		return (
			<SafeAreaView style={styles.screen}>
				<Header title={"Evenimente salvate"} variant="3" arrowColor="black" backButtonSize={24.5} />
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Nu aveti evenimente salvate.</Text>
				</View>
			</SafeAreaView>
		);

	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Evenimente salvate"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<FlatList
				data={savedEvents}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
				keyExtractor={(event) => event.id_event.toString()}
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

	list: {
		paddingInline: 20,
	},

	contentContainerList: {
		paddingBlock: 20,
		gap: 17,
	},
});

export default SavedEventsScreen;
