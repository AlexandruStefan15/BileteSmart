import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//constants
import { Colors } from "@/constants/Colors";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

const SeatsPlanScreen = forwardRef(
	({ navigation, route, infoModalShowedOnce, setInfoModalShowedOnce, ...props }, ref) => {
		/* const [isModalVisible, setIsModalVisible] = React.useState(false); */
		const { roomId, rooms } = route.params;
		const currentRoom = rooms.find((room) => room.id_room == roomId);

		/* const closeModal = () => {
			setIsModalVisible(false);
		}; */

		/* useEffect(() => {
			if (infoModalShowedOnce) return;
			const timer = setTimeout(() => {
				setIsModalVisible(true);
				setInfoModalShowedOnce?.(true);
			}, 800);

			return () => clearTimeout(timer);
		}, []); */

		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Header
					variant="2"
					style={{ backgroundColor: Colors.tertiary }}
					/* showCart={true}
					seatCount={props.seatCount}
					badgeStyle={props.badgeStyle}
					displayBadge={props.displayBadge}*/
					backButtonSize={25.5}
				/>
				<SvgHallPlan
					currentRoom={currentRoom}
					selectSeats={true}
					fieldPosition={currentRoom.field_position}
					style={{ marginTop: 45 }}
				/>

				{/* <Modal
					isVisible={isModalVisible}
					title="Selectează locurile"
					subtitle="Selectati locurile pe care doriti sa le rezervati. Acestea vor fi adaugate automat in cosul de cumparaturi."
					onClose={closeModal}
					useNativeDriver={true}
				/> */}
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
});

export default SeatsPlanScreen;
