import React, { useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched

//store
import { useCartSidebarStore } from "@/store/store";

//compoenents
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Modal from "@/components/Modal";

export default SeatsPlanScreen = ({ navigation, route, ...props }) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const { roomId, rooms } = route.params;
	const currentRoom = rooms.find((room) => room.id_room == roomId);
	const { sidebarX } = useCartSidebarStore();

	const closeModal = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		setIsModalVisible(true);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Header
				variant="3"
				showCart={true}
				seatCount={props.seatCount}
				badgeStyle={props.badgeStyle}
				displayBadge={props.displayBadge}
				openSidebar={props.openSidebar}
			/>
			<SvgHallPlan
				currentRoom={currentRoom}
				selectSeats={true}
				fieldPosition={currentRoom.field_position}
				style={{ marginTop: 45 }}
			/>
			<CartSidebar sidebarX={sidebarX} displayBadge={props.displayBadge} />
			<Modal
				isVisible={isModalVisible}
				title="Selectează locurile"
				subtitle="Selectati locurile pe care doriti sa le rezervati. Biletele vor fi adaugate automat in cosul de cumparaturi!"
				onClose={closeModal}
				useNativeDriver={true}
			/>
		</SafeAreaView>
	);
};

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

	footer: { alignItems: "center", padding: 15 },
});
