import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const TicketsInfo = ({ selectedSeats }) => {
	return (
		<View>
			<ScrollView>
				{selectedSeats.map((seat, index) => (
					<View
						key={index}
						style={{ padding: 10, backgroundColor: "lightgray", marginVertical: 5 }}
					>
						<Text>Seat Number: {seat.seat_number}</Text>
						<Text>Price: {seat.price}</Text>
						<Text>Row: {seat.row}</Text>
					</View>
				))}
				<View style={{ padding: 10, backgroundColor: "lightblue", marginVertical: 5 }}>
					<Text>Total Price: {selectedSeats.reduce((total, seat) => total + seat.price, 0)}</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({});

export default TicketsInfo;
