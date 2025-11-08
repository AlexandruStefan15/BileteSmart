import React, { forwardRef, useRef, useEffect, useMemo } from "react";
import { StyleSheet, View, Dimensions, Text, BackHandler } from "react-native";

// stores
import { useCartSidebarStore, useSelectedSeatsStore } from "@/store";

// components
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import Icon from "./Icon";

const SeeTheCartBottomSheet = forwardRef(({}, ref) => {
	const openSidebar = useCartSidebarStore((s) => s.openSidebar);
	const selectedSeats = useSelectedSeatsStore((s) => s.selectedSeats);
	const bottomSheetRef = useRef(null);
	const { height: screenHeight } = Dimensions.get("screen");

	const totalPrice = useMemo(
		() => selectedSeats.reduce((sum, seat) => sum + parseFloat(seat.price), 0),
		[selectedSeats]
	);

	// expand or close sheet when seats change
	useEffect(() => {
		if (selectedSeats.length > 0 && !bottomSheetRef.current.isCollapsed.current) {
			setTimeout(() => bottomSheetRef.current.expand(), 100);
		} else if (selectedSeats.length === 0) {
			bottomSheetRef.current.close();
		}
	}, [selectedSeats.length]);

	useEffect(() => {
		let backSub;

		const handleBackPress = () => {
			const { isSidebarOpen } = useCartSidebarStore.getState();
			const sheet = bottomSheetRef.current;
			if (!sheet) return false;

			const isExpanded = sheet.isExpanded.current;
			const isCollapsed = sheet.isCollapsed.current;
			const isClosed = sheet.isClosed.current;

			// Sidebar open → let sidebar handle
			if (isSidebarOpen) return false;

			// Sheet expanded → collapse
			if (isExpanded) {
				sheet.collapse();
				return true;
			}

			// Everything closed → allow navigation
			return false;
		};

		const attachHandler = () => {
			if (backSub) backSub.remove();
			backSub = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
		};

		attachHandler();

		return () => {
			if (backSub) backSub.remove();
		};
	}, []);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			activeHeight={screenHeight * 0.325}
			backgroundColor={"#2e2e2eff"}
			backDropColor={"black"}
			collapseOnExternalInteraction={true}
		>
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
					onPress={() => {
						setTimeout(() => openSidebar(), 200);
					}}
					iconRight={<Icon lib="io" name="cart-outline" size={23} color="white" />}
				>
					Vezi cosul
				</Button>
			</View>
		</BottomSheet>
	);
});

const styles = StyleSheet.create({
	container: { paddingInline: 24, paddingBlock: 20 },
	row: { flexDirection: "row", justifyContent: "space-between", paddingBlock: 10 },
	row_right: { fontWeight: "bold", fontSize: 18, color: "white" },
	text: { color: "lightgrey", fontWeight: "400", fontSize: 16.1, lineHeight: 24 },
	separator: { width: "100%", backgroundColor: "#80808057", height: 1, marginBlock: 3 },
	button: { marginTop: 21, paddingBlock: 16, borderRadius: 12 },
});

export default SeeTheCartBottomSheet;
