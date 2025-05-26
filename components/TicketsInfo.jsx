import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";

//store
import { useSelectedSeats } from "@/store/store";

//colors
import { Colors } from "@/constants";

//icons
import EntypoIcon from "react-native-vector-icons/Entypo";

//components
import Select from "./Select";
import { FlatList } from "react-native-gesture-handler";

const TicketsInfo = ({}) => {
	const { selectedSeats, removeSeat } = useSelectedSeats();

	return (
		<View style={{ flex: 1 }}>
			{[...selectedSeats].length > 0 ? (
				<FlatList
					style={styles.ticketList}
					data={selectedSeats}
					keyExtractor={(item) => item.id_seat.toString()}
					contentContainerStyle={{ gap: 12, marginBlock: 12, paddingBottom: 24 }}
					renderItem={({ item }) => (
						<TicketItem item={item} selectedSeats={selectedSeats} onRemove={removeSeat} />
					)}
				/>
			) : (
				<Text style={{ margin: "auto" }}>Momentan nu ai bilete in coș...</Text>
			)}
		</View>
	);
};

const TicketItem = ({ item, onRemove }) => {
	const { updateSeatType } = useSelectedSeats();
	const translateX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const handleRemove = () => {
		translateX.value = withTiming(-500, { duration: 300 }, (finished) => {
			if (finished) {
				runOnJS(onRemove)(item.id_seat);
			}
		});
	};

	const teeth = Array.from({ length: 6 });

	return (
		<Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
			<View style={styles.ticketList_item}>
				{teeth.map((_, index) => (
					<View key={index} style={[styles.tooth, { top: index * 15.5 }]} />
				))}
				<Text style={styles.ticketList_item_text}>
					Locul: <Text style={{ color: "#5fa0c4", fontWeight: "bold" }}>{item.seat_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Randul: <Text style={{ color: "#5fa0c4", fontWeight: "bold" }}>{item.row_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Sectorul: <Text style={{ color: "#5fa0c4", fontWeight: "bold" }}>{item.room_name}</Text>
				</Text>
				<Text style={{ fontWeight: "600", fontSize: 17, marginTop: 12, color: "#5fa0c4" }}>
					{item.price} RON
				</Text>
				<Select
					selected={item.is_discounted == "1" ? "Redus" : "Intreg"}
					onChange={(value) => updateSeatType(item.id_seat, value)}
					selectStyles={{
						position: "absolute",
						zIndex: 999,
						right: 42,
						top: 50,
						backgroundColor: "#2e2d2d",
						borderColor: "transparent",
						borderRadius: 6,
					}}
					textStyles={{ color: "#5fa0c4", fontWeight: "bold", fontSize: 14.5 }}
				/>
			</View>
			<TouchableOpacity onPress={handleRemove} style={styles.ticketList_removeButton}>
				<Text style={styles.ticketList_removeButton_text}>
					<EntypoIcon name="cross" size={21} />
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	ticketList: {
		paddingInline: 15,
		position: "relative",
	},

	tooth: {
		position: "absolute",
		marginTop: 29,
		left: -3,
		width: 8.5,
		height: 8.5,
		borderRadius: 10,
		backgroundColor: "white",
		zIndex: 2,
	},

	ticketList_item: {
		position: "relative",
		width: "84%",
		padding: 16,
		backgroundColor: "#363736",
		gap: 3,
		paddingInline: 28,
		borderRadius: 12,
	},

	ticketList_item_text: {
		fontWeight: "500",
		fontSize: 14.5,
		color: "white",
	},

	ticketList_removeButton: {
		backgroundColor: "#d60303f0",
		borderRadius: 25,
		padding: 7,
		alignSelf: "flex-start",
		top: "50%",
		transform: [{ translateY: -17 }],
		marginInline: "auto",
		left: 5,
	},

	ticketList_removeButton_text: {
		color: "white",
	},
});

export default TicketsInfo;
