import React, { forwardRef, useRef, useEffect, useImperativeHandle, useMemo } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";

//store
import { useCartSidebarStore, useSelectedSeatsStore } from "@/store";

//components
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import Icon from "./Icon";

const SeeTheCartBottomSheet = forwardRef(({ isBottomSheetCollapsed }, ref) => {
	const openSidebar = useCartSidebarStore((s) => s.openSidebar);
	const selectedSeats = useSelectedSeatsStore((s) => s.selectedSeats);
	const bottomSheetRef = useRef(null);
	const { height: screenHeight } = Dimensions.get("screen");

	const totalPrice = useMemo(
		() => selectedSeats.reduce((sum, seat) => sum + parseFloat(seat.price), 0),
		[selectedSeats]
	);

	useImperativeHandle(ref, () => ({
		close: () => bottomSheetRef.current?.close(),
		expand: () => bottomSheetRef.current?.expand(),
	}));

	useEffect(() => {
		if (selectedSeats.length > 0 && !isBottomSheetCollapsed.current)
			setTimeout(() => {
				bottomSheetRef.current.expand();
			}, 100);
		if (selectedSeats.length == 0) bottomSheetRef.current.close();
	}, [selectedSeats.length]);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			activeHeight={screenHeight * 0.325}
			backgroundColor={"#2e2e2eff"}
			backDropColor={"black"}
			isBottomSheetCollapsed={isBottomSheetCollapsed}
			collapseOnExternalInteraction={true}
		>
			<View style={bottomSheetStyles.container}>
				<View style={bottomSheetStyles.row}>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_left]}>
						Numarul de bilete
					</Text>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_right]}>
						{selectedSeats.length}
					</Text>
				</View>
				<View style={bottomSheetStyles.separator} />
				<View style={bottomSheetStyles.row}>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_left]}>Total</Text>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_right]}>
						{totalPrice} lei
					</Text>
				</View>
				<Button
					style={bottomSheetStyles.button}
					variant="3"
					onPress={() => {
						setTimeout(() => {
							openSidebar();
						}, 200);
					}}
					iconRight={<Icon lib="io" name="cart-outline" size={23} color={"white"} />}
				>
					Vezi cosul
				</Button>
			</View>
		</BottomSheet>
	);
});

const bottomSheetStyles = {
	container: {
		paddingInline: 24,
		paddingBlock: 20,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBlock: 10,
	},

	row_left: {},

	row_right: {
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
	},

	text: {
		color: "lightgrey",
		fontWeight: 400,
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
};

export default SeeTheCartBottomSheet;
