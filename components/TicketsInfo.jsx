import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//colors
import { Colors } from "@/constants";

//data
import { useSelectedSeats } from "@/store/store";

const TicketsInfo = ({ selectedSeats }) => {
	const removeSeat = useSelectedSeats((state) => state.removeSeat);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={styles.ticketList}
				data={selectedSeats}
				keyExtractor={(item) => item.id_seat.toString()}
				contentContainerStyle={{ gap: 10, marginBlock: 10, paddingBottom: 20 }}
				renderItem={({ item }) => (
					<View>
						<View style={styles.ticketList_item}>
							<Text>Locul: {item.seat_no}</Text>
							<Text>Pret: {item.price} RON</Text>
							<Text>Randul: {item.row_no}</Text>
							<Text>Sectorul: {item.room_name}</Text>
						</View>
						<TouchableOpacity
							onPress={() => removeSeat(item.id_seat)}
							style={styles.ticketList_removeButton}
						>
							<Text style={styles.ticketList_removeButton_text}>X</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	ticketList: {
		paddingInline: 15,
	},

	ticketList_item: {
		padding: 10,
		backgroundColor: "lightgray",
		gap: 2,
		paddingInline: 15,
	},

	ticketList_removeButton: {
		position: "absolute",
		backgroundColor: "#a50a0a",
		borderRadius: 5,
		paddingVertical: 4,
		paddingHorizontal: 10.5,
		right: 21,
		top: "50%",
		transform: [{ translateY: -14 }],
	},

	ticketList_removeButton_text: {
		fontSize: 16,
		color: "white",
	},
});

export default TicketsInfo;
