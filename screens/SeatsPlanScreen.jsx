import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//constants
import { Colors } from "@/constants/Colors";

//context
import { useBottomSheetMinimizedContext } from "@/context/BottomSheetMinimizedContext";

//store
import { useCartSidebarStore, useSelectedSeats } from "@/store";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Modal from "@/components/Modal";
import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const SeatsPlanScreen = forwardRef(
	({ navigation, route, infoModalShowedOnce, setInfoModalShowedOnce, ...props }, ref) => {
		/* const [isModalVisible, setIsModalVisible] = React.useState(false); */
		const { roomId, rooms } = route.params;
		const currentRoom = rooms.find((room) => room.id_room == roomId);
		const { sidebarX, openSidebar } = useCartSidebarStore();
		const { selectedSeats } = useSelectedSeats();
		const { isBottomSheetCollapsed } = useBottomSheetMinimizedContext();
		const bottomSheetRef = useRef(null);
		const { height: screenHeight } = Dimensions.get("screen");

		/* const closeModal = () => {
			setIsModalVisible(false);
		}; */

		useImperativeHandle(ref, () => ({
			closeBottomSheet: () => bottomSheetRef.current?.close(),
		}));

		/* useEffect(() => {
			if (infoModalShowedOnce) return;
			const timer = setTimeout(() => {
				setIsModalVisible(true);
				setInfoModalShowedOnce?.(true);
			}, 800);

			return () => clearTimeout(timer);
		}, []); */

		useEffect(() => {
			if (selectedSeats.length > 0 && !isBottomSheetCollapsed.current)
				bottomSheetRef.current.expand();
			if (selectedSeats.length == 0) bottomSheetRef.current.close();
		}, [selectedSeats.length]);

		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Header
					variant="2"
					style={{ backgroundColor: Colors.tertiary }}
					showCart={true}
					seatCount={props.seatCount}
					badgeStyle={props.badgeStyle}
					displayBadge={props.displayBadge}
					openSidebar={props.openSidebar}
					backButtonSize={25.5}
				/>
				<SvgHallPlan
					currentRoom={currentRoom}
					selectSeats={true}
					fieldPosition={currentRoom.field_position}
					style={{ marginTop: 45 }}
				/>
				<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
				{/* <Modal
					isVisible={isModalVisible}
					title="Selectează locurile"
					subtitle="Selectati locurile pe care doriti sa le rezervati. Acestea vor fi adaugate automat in cosul de cumparaturi."
					onClose={closeModal}
					useNativeDriver={true}
				/> */}
				<BottomSheet
					ref={bottomSheetRef}
					activeHeight={screenHeight * 0.25}
					backgroundColor={"#2e2e2eff"}
					backDropColor={"black"}
					sharedTopAnimation={props.sharedTopAnimation}
				>
					<View style={styles.bottomSheetContainer}>
						<View style={styles.bottomSheetContainer_row}>
							<Text
								style={[styles.bottomSheetContainer_text, styles.bottomSheetContainer_row_left]}
							>
								Numarul de bilete
							</Text>
							<Text
								style={[styles.bottomSheetContainer_text, styles.bottomSheetContainer_row_right]}
							>
								2
							</Text>
						</View>
						<View style={styles.bottomSheetContainer_separator} />
						<View style={styles.bottomSheetContainer_row}>
							<Text
								style={[styles.bottomSheetContainer_text, styles.bottomSheetContainer_row_left]}
							>
								Total
							</Text>
							<Text
								style={[styles.bottomSheetContainer_text, styles.bottomSheetContainer_row_right]}
							>
								25 lei
							</Text>
						</View>
						<Button
							style={styles.bottomSheetContainer_button}
							variant="3"
							onPress={openSidebar}
							iconRight={<Icon lib="io" name="cart-outline" size={23} color={"white"} />}
						>
							Vezi cosul
						</Button>
					</View>
				</BottomSheet>
			</SafeAreaView>
		);
	}
);

const styles = StyleSheet.create({
	/* modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingInline: 1,
		paddingBottom: 3,
	}, */

	/* title: {
		fontSize: 19.5,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 9,
		lineHeight: 20,
	}, */

	bottomSheetContainer: {
		paddingInline: 21,
		paddingBlock: 20,
	},

	bottomSheetContainer_row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBlock: 10,
	},

	bottomSheetContainer_text: {
		color: "lightgrey",
		fontWeight: 400,
		fontSize: 16,
		lineHeight: 24,
	},

	bottomSheetContainer_row_right: {
		fontWeight: "bold",
		fontSize: 18,
	},

	bottomSheetContainer_separator: {
		width: "100%",
		backgroundColor: "#80808057",
		height: 1,
		marginBlock: 3,
	},

	bottomSheetContainer_button: {
		marginTop: 15,
	},
});

export default SeatsPlanScreen;
