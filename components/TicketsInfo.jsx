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
				contentContainerStyle={{ gap: 12, marginBlock: 12, paddingBottom: 24 }}
				renderItem={({ item }) => (
					<View>
						<View style={styles.ticketList_item}>
							<Text style={{ fontWeight: "500" }}>
								Locul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.seat_no}</Text>
							</Text>
							<Text style={{ fontWeight: "500" }}>
								Randul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.row_no}</Text>
							</Text>
							<Text style={{ fontWeight: "500" }}>
								Sectorul:{" "}
								<Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.room_name}</Text>
							</Text>
							<Text style={{ fontWeight: "500", fontSize: 16.5, marginTop: 10 }}>
								{item.price} RON
							</Text>
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
		backgroundColor: "#d3d3d3c4",
		gap: 2,
		paddingInline: 15,
	},

	ticketList_removeButton: {
		position: "absolute",
		backgroundColor: "#d60303f0",
		borderRadius: 5,
		paddingVertical: 4,
		paddingHorizontal: 10.5,
		right: 20,
		top: "50%",
		transform: [{ translateY: -14 }],
	},

	ticketList_removeButton_text: {
		fontSize: 16,
		color: "white",
	},
});

export default TicketsInfo;
