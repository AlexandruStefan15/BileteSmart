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
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Bilete</Text>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Sub-total</Text>
				</View>
				{selectedSeats.map((seat, index) => (
					<View key={index} style={styles.row}>
						<Text style={{ fontSize: 14.8, flexShrink: 1, paddingRight: 120 }}>
							Sector: {seat.room_name} | Rand: {seat.row_no} | Scaun: {seat.seat_no} | Tip bilet:{" "}
							{seat.is_discounted ? "Redus" : "Intreg"}
						</Text>
						<Text style={{ fontSize: 15 }}>{seat.price} RON</Text>
					</View>
				))}
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Subtotal:</Text>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>
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
					style={{ marginTop: 18, backgroundColor: "#23527c", padding: 12, borderRadius: 6 }}
				>
					<Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
						Plasează Comanda
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
		paddingTop: 20,
		paddingBottom: 25,
		paddingInline: 21,
		backgroundColor: "#f0f8ff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},

	title: {
		fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 35,
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
		paddingBottom: 11,
	},

	footer: {
		marginTop: 18,
	},
});

export default OrderSummary;
