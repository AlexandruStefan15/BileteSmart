import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//colors
import { Colors } from "@/constants";

const TicketsInfo = ({ selectedSeats }) => {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={{ paddingInline: 15 }}
				data={selectedSeats}
				keyExtractor={(item) => item.id_seat.toString()}
				contentContainerStyle={{ gap: 10, marginBlock: 10, paddingBottom: 20 }}
				renderItem={({ item }) => (
					<View style={{ padding: 10, backgroundColor: "lightgray" }}>
						<Text>Seat number: {item.seat_no}</Text>
						<Text>Price: {item.price} RON</Text>
						<Text>Row: {item.row_no}</Text>
					</View>
				)}
			/>
			<View style={styles.footer}>
				<View style={{ padding: 15, backgroundColor: "lightblue", marginVertical: 5 }}>
					<Text>Total Price: {selectedSeats.reduce((total, seat) => total + seat.price, 0)}</Text>
				</View>
				<TouchableOpacity style={styles.checkoutButton}>
					<Text style={styles.checkoutButton_text}>Checkout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	seatList: {
		flex: 1,
	},

	checkoutButton: {
		backgroundColor: Colors.tertiary,
		padding: 15,
		borderRadius: 5,
	},
	checkoutButton_text: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},

	footer: {
		paddingInline: 15,
		paddingBlock: 11,
		paddingTop: 8,
		borderTopWidth: 0.5,
		width: "100%",
		gap: 5,
	},
});

export default TicketsInfo;
