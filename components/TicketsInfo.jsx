import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";

//colors
import { Colors } from "@/constants";

const TicketsInfo = ({ selectedSeats }) => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					justifyContent: "space-between",
				}}
			>
				<View style={styles.seatList}>
					{selectedSeats.map((seat, index) => (
						<View
							key={index}
							style={{ padding: 10, backgroundColor: "lightgray", marginVertical: 5 }}
						>
							<Text>Seat number: {seat.seat_no}</Text>
							<Text>Price: {seat.price}</Text>
							<Text>Row: {seat.row}</Text>
						</View>
					))}
				</View>
				<View style={styles.footer}>
					<View style={{ padding: 10, backgroundColor: "lightblue", marginVertical: 5 }}>
						<Text>Total Price: {selectedSeats.reduce((total, seat) => total + seat.price, 0)}</Text>
					</View>
					<TouchableOpacity style={styles.checkoutButton}>
						<Text style={styles.checkoutButton_text}>Checkout</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default TicketsInfo;
