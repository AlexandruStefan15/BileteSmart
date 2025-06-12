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
								fontSize: 15.5,
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
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>Subtotal:</Text>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>
						{selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0)} RON
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>Taxa procesare tranzactie:</Text>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>3 RON</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>Total:</Text>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>
						{selectedSeats.reduce((total, seat) => total + parseFloat(seat.price), 0) + 3} RON
					</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.footer}>
					<Text style={{}}>
						Datele dumneavoastră personale vor fi folosite pentru a vă procesa comanda, pentru a vă
						sprijini experiența pe acest site web și în alte scopuri descrise în
						<Text style={{ fontWeight: "bold", color: "#23527c" }} onPress={() => {}}>
							{" "}
							politica noastră de confidențialitate.
						</Text>
					</Text>
					<TouchableOpacity
						onPress={() => formRef?.current?.submit()}
						style={{ backgroundColor: "#23527c", padding: 13, borderRadius: 6 }}
					>
						<Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
							Finalizează Comanda
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		paddingTop: 20,
		paddingBottom: 20,
		paddingInline: 21,
		backgroundColor: "#ecf3f6",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
	},

	title: {
		fontSize: 19.2,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 40,
		marginTop: 17,
		color: "#23527c",
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

	footer: { gap: 13, marginTop: 6 },
});

export default OrderSummary;
