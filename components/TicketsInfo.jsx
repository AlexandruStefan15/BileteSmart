import React, { useContext } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//colors
import { Colors } from "@/constants";

//icons
import EntypoIcon from "react-native-vector-icons/Entypo";

const TicketsInfo = ({ selectedSeats = [], setSelectedSeats }) => {
	return (
		<View style={{ flex: 1 }}>
			{selectedSeats.length > 0 ? (
				<FlatList
					style={styles.ticketList}
					data={selectedSeats}
					keyExtractor={(item) => item.id_seat.toString()}
					contentContainerStyle={{ gap: 12, marginBlock: 12, paddingBottom: 24 }}
					renderItem={({ item }) => (
						<View style={styles.ticketList_item}>
							<Text style={styles.ticketList_item_text}>
								Locul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.seat_no}</Text>
							</Text>
							<Text style={styles.ticketList_item_text}>
								Randul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.row_no}</Text>
							</Text>
							<Text style={styles.ticketList_item_text}>
								Sectorul:{" "}
								<Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.room_name}</Text>
							</Text>
							<Text style={{ fontWeight: "600", fontSize: 17, marginTop: 12 }}>
								{item.price} RON
							</Text>
							<TouchableOpacity
								onPress={() =>
									setSelectedSeats((prev) => prev.filter((seat) => seat.id_seat != item.id_seat))
								}
								style={styles.ticketList_removeButton}
							>
								<Text style={styles.ticketList_removeButton_text}>
									<EntypoIcon name="cross" size={21} />
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			) : (
				<Text style={{ margin: "auto" }}>Momentan nu ai bilete in coș...</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	ticketList: {
		paddingInline: 15,
	},

	ticketList_item: {
		padding: 10,
		backgroundColor: "#d3d3d3a8",
		gap: 3,
		paddingInline: 15,
	},

	ticketList_item_text: {
		fontWeight: "500",
		fontSize: 14.5,
	},

	ticketList_removeButton: {
		position: "absolute",
		backgroundColor: "#d60303f0",
		borderRadius: 25,
		paddingVertical: 7,
		paddingHorizontal: 7,
		right: 20,
		top: "50%",
		transform: [{ translateY: -12 }],
	},

	ticketList_removeButton_text: {
		color: "white",
	},
});

export default TicketsInfo;
