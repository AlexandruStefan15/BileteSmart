import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";

//context
import { useBottomSheetMinimizedContext } from "@/context/BottomSheetMinimizedContext";

//store
import { useCartSidebarStore, useSelectedSeats } from "@/store";

//components
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import Icon from "./Icon";

const SeeTheCartBottomSheet = forwardRef(({ sharedTopAnimation }, ref) => {
	const { openSidebar } = useCartSidebarStore();
	const { selectedSeats } = useSelectedSeats();
	const { isBottomSheetCollapsed } = useBottomSheetMinimizedContext();
	const bottomSheetRef = useRef(null);
	const { height: screenHeight } = Dimensions.get("screen");

	useImperativeHandle(ref, () => ({
		close: () => bottomSheetRef.current?.close(),
		expand: () => bottomSheetRef.current?.expand(),
	}));

	useEffect(() => {
		if (selectedSeats.length > 0 && !isBottomSheetCollapsed.current)
			bottomSheetRef.current.expand();
		if (selectedSeats.length == 0) bottomSheetRef.current.close();
	}, [selectedSeats.length]);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			activeHeight={screenHeight * 0.32}
			backgroundColor={"#2e2e2eff"}
			backDropColor={"black"}
			sharedTopAnimation={sharedTopAnimation}
		>
			<View style={bottomSheetStyles.container}>
				<View style={bottomSheetStyles.row}>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_left]}>
						Numarul de bilete
					</Text>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_right]}>2</Text>
				</View>
				<View style={bottomSheetStyles.separator} />
				<View style={bottomSheetStyles.row}>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_left]}>Total</Text>
					<Text style={[bottomSheetStyles.text, bottomSheetStyles.row_right]}>25 lei</Text>
				</View>
				<Button
					style={bottomSheetStyles.button}
					variant="3"
					onPress={openSidebar}
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
		paddingInline: 28,
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
		fontSize: 16,
		lineHeight: 24,
	},

	separator: {
		width: "100%",
		backgroundColor: "#80808057",
		height: 1,
		marginBlock: 3,
	},

	button: {
		marginTop: 15,
		paddingBlock: 16,
		borderRadius: 12,
	},
};

export default SeeTheCartBottomSheet;
