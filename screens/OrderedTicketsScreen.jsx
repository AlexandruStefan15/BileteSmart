import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, FlatList } from "react-native";

//constants
import { Colors } from "@/constants";

//components
import Header from "@/components/Header";
import Ticket from "@/components/Ticket";

const OrderedTicketsScreen = ({ navigation, route }) => {
	const { tickets, event_title } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			{/* <Header variant="2" arrowColor="black" style={{ position: "relative" }} /> */}
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
