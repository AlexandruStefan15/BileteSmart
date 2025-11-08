import React, { useEffect, useMemo } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { withTiming } from "react-native-reanimated";

//colors
import { Colors } from "@/constants";

// store
import { useCartSidebarStore, useSelectedSeatsStore } from "@/store";

//components
import Button from "./Button";
import Icon from "./Icon";

const SeeTheCartPanel = () => {
	/* const openSidebar = useCartSidebarStore((s) => s.openSidebar); */
	const sidebarX = useCartSidebarStore((s) => s.sidebarX);
	const isSidebarOpen = useCartSidebarStore((s) => s.isSidebarOpen);
	const openSidebar = useCartSidebarStore((s) => s.openSidebar);
	const selectedSeats = useSelectedSeatsStore((s) => s.selectedSeats);

	const totalPrice = useMemo(
		() => selectedSeats.reduce((sum, seat) => sum + parseFloat(seat.price), 0),
		[selectedSeats]
	);

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={[styles.text]}>Numarul de bilete</Text>
				<Text style={[styles.text, styles.row_right]}>{selectedSeats.length}</Text>
			</View>
			<View style={styles.separator} />
			<View style={styles.row}>
				<Text style={[styles.text]}>Total</Text>
				<Text style={[styles.text, styles.row_right]}>{totalPrice} lei</Text>
			</View>

			<Button
				style={styles.button}
				variant="3"
				/* onPress={() => {
					setTimeout(() => (sidebarX.value = withTiming(0)), 200);
					isSidebarOpen.value = true;
				}} */
				onPress={() => {
					setTimeout(() => openSidebar(), 200);
				}}
				iconRight={<Icon lib="io" name="cart-outline" size={23} color="white" />}
			>
				Vezi cosul
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingInline: 24,
		paddingBlock: 20,
		backgroundColor: Colors.tertiary,
		width: "100%",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBlock: 10,
	},
	row_right: {
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
	},
	text: {
		color: "lightgrey",
		fontWeight: "400",
		fontSize: 16.1,
		lineHeight: 24,
	},
	separator: {
		width: "100%",
		backgroundColor: "#80808057",
		height: 1,
		marginBlock: 3,
	},
	button: {
		marginTop: 21,
		paddingBlock: 16,
		borderRadius: 12,
	},
});

export default SeeTheCartPanel;
