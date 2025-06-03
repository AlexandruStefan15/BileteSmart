import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

//store
import { useSelectedSeats } from "@/store/store";

const OrderSummary = ({ formRef }) => {
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
					<View key={index} style={[styles.row, { paddingBottom: 15 }]}>
						<Text
							style={{
								fontSize: 15,
								flexShrink: 1,
								paddingRight: 130,
								lineHeight: 20,
								fontWeight: "500",
								color: "#23527c",
							}}
						>
							Sector: {seat.room_name}, Rand: {seat.row_no}, Scaun: {seat.seat_no}, Tip:{" "}
							{seat.is_discounted ? "Redus" : "Intreg"}
						</Text>
						<Text style={{ fontSize: 15.5, fontWeight: "600", color: "#23527c" }}>
							{seat.price} RON
						</Text>
					</View>
				))}
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Subtotal:</Text>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>
						{selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0)} RON
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>Taxa procesare tranzactie:</Text>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>3 RON</Text>
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
					<TouchableOpacity>
						<Text style={{ fontWeight: "bold" }}>politica noastră de confidențialitate.</Text>
					</TouchableOpacity>
				</Text>
				<TouchableOpacity
					onPress={() => formRef?.current?.submit()}
					style={{ marginTop: 18, backgroundColor: "#23527c", padding: 13, borderRadius: 6 }}
				>
					<Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
						Finalizează Comanda
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
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
	},

	title: {
		fontSize: 17.7,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 38,
		marginTop: 17,
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
		paddingBottom: 15,
	},

	footer: {
		marginTop: 18,
	},
});

export default OrderSummary;
