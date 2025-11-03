import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//constants
import { Colors } from "@/constants/Colors";

//store
import { useCartSidebarStore, useSelectedSeats } from "@/store";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Modal from "@/components/Modal";
import BottomSheet from "@/components/BottomSheet";

const SeatsPlanScreen = forwardRef(
	({ navigation, route, infoModalShowedOnce, setInfoModalShowedOnce, ...props }, ref) => {
		/* const [isModalVisible, setIsModalVisible] = React.useState(false); */
		const { roomId, rooms } = route.params;
		const currentRoom = rooms.find((room) => room.id_room == roomId);
		const { sidebarX, openSidebar } = useCartSidebarStore();
		const { selectedSeats } = useSelectedSeats();
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
			if (selectedSeats.length > 0) bottomSheetRef.current.expand();
			else bottomSheetRef.current.close();
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
					activeHeight={screenHeight * 0.2}
					backgroundColor={"#2e2e2eff"}
					backDropColor={"black"}
					sharedTopAnimation={props.sharedTopAnimation}
				>
					<View style={styles.buttonsContainer}>
						<Button title="Vezi cosul" onPress={openSidebar} />
					</View>
				</BottomSheet>
			</SafeAreaView>
		);
	}
);

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingInline: 1,
		paddingBottom: 3,
	},

	header: {
		paddingBlock: 20,
		borderColor: "#eee",
		gap: 10,
	},

	title: {
		fontSize: 19.5,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 9,
		lineHeight: 20,
	},

	caption: {
		fontSize: 15.5,
		textAlign: "center",
		maxWidth: 220,
		alignSelf: "center",
		lineHeight: 20,
	},

	labelText: {
		fontSize: 16,
		textAlign: "center",
		paddingBlock: 12,
		marginBlock: 9,
		paddingInline: 16,
		marginInline: 12,
		fontWeight: "600",
		borderRadius: 13,
	},

	separator: {
		borderTopWidth: 1,
		borderColor: "#ccccccad",
		width: "100%",
	},

	button: {
		backgroundColor: "#2196f3",
		width: "100%",
	},

	buttonsContainer: { alignItems: "center", padding: 15 },
});

export default SeatsPlanScreen;
