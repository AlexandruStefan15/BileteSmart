import React from "react";
import { StyleSheet, View, ScrollView, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//constants
import { Colors } from "@/constants";

//components
import Ticket from "@/components/Ticket";
import Header from "@/components/Header";

const OrderedTicketsScreen = ({ navigation, route }) => {
	const { tickets, event_title } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Bilete"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<FlatList
				data={tickets}
				renderItem={({ item: ticket }) => <Ticket data={{ ...ticket, event_title }} variant="2" />}
				keyExtractor={(ticket) => ticket.ticket_codes}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
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
		marginTop: 10,
	},

	contentContainerList: {
		padding: 16,
		paddingBlock: 5,
		gap: 15,
	},
});

export default OrderedTicketsScreen;
