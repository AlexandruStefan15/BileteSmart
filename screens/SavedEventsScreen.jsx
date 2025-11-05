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
				keyExtractor={(event) => event.id_event.toString()}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
				/* scrollEnabled={false} */
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background,
	},

	list: {
		paddingInline: 20,
	},

	contentContainerList: {
		paddingBlock: 20,
		gap: 20,
	},
});

export default SavedEventsScreen;
