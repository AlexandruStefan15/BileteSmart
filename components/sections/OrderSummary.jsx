import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

//store
import { useSelectedSeats } from "@/store/store";

const OrderSummary = () => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Rezumat Comandă</Text>
			<View style={styles.ticketsInfo}>
				<View style={styles.row}>
					<Text style={{ fontSize: 16 }}>Bilete</Text>
					<Text style={{ fontSize: 16 }}>Sub-total</Text>
				</View>
				{selectedSeats.map((seat, index) => (
					<View key={index} style={styles.row}>
						<Text style={{ fontSize: 15, flexShrink: 1, paddingRight: 120 }}>
							Sector: {seat.room_name} | Rand: {seat.row_no} | Scaun: {seat.seat_no} | Tip bilet:{" "}
							{seat.is_discounted ? "Redus" : "Intreg"}
						</Text>
						<Text style={{ fontSize: 15 }}>{seat.price} RON</Text>
					</View>
				))}
				<View style={styles.row}>
					<Text style={{ fontSize: 15 }}>Subtotal:</Text>
					<Text style={{ fontSize: 15 }}>
						{selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0)} RON
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontSize: 15 }}>Taxa procesare tranzactie:</Text>
					<Text style={{ fontSize: 15 }}>3 RON</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Total:</Text>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>
						{selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0) + 3} RON
					</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<Text>
					Datele dumneavoastră personale vor fi folosite pentru a vă procesa comanda, pentru a vă
					sprijini experiența pe acest site web și în alte scopuri descrise în{" "}
					<TouchableOpacity style={{ color: "#23527c" }}>
						<Text>politica noastră de confidențialitate.</Text>
					</TouchableOpacity>
				</Text>
				<TouchableOpacity
					style={{ marginTop: 16, backgroundColor: "#5fa0c4", padding: 12, borderRadius: 6 }}
				>
					<Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
						Plasează Comanda
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBlock: 20,
		paddingInline: 21,
		backgroundColor: "#f0f8ff",
	},

	title: {
		fontSize: 19,
		fontWeight: "500",
		textAlign: "center",
		marginBottom: 40,
		marginTop: 15,
	},

	ticketsInfo: {
		gap: 20,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 0.5,
		borderBottomColor: "#ccc",
		paddingBottom: 10,
	},
});

export default OrderSummary;
