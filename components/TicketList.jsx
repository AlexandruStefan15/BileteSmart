import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, InteractionManager } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

import { useSelectedSeats } from "@/store/store";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Select from "./Select";

const teeth = Array.from({ length: 6 });

const TicketList = ({ style }) => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
	const removeSeat = useSelectedSeats((state) => state.removeSeat);

	if (selectedSeats.length === 0) {
		return <Text style={{ margin: "auto" }}>Momentan nu ai bilete în coș...</Text>;
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={[styles.ticketList, style]}
				data={selectedSeats}
				keyExtractor={(seat) => seat.id_seat.toString()}
				contentContainerStyle={{ gap: 12, paddingBlock: 15 }}
				renderItem={({ item }) => <Ticket data={item} onRemove={removeSeat} />}
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={10}
				removeClippedSubviews
			/>
		</View>
	);
};

const Ticket = React.memo(({ data, onRemove }) => {
	const updateSeatType = useSelectedSeats((state) => state.updateSeatType);
	const translateX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const handleRemove = () => {
		translateX.value = withTiming(-500, { duration: 300 }, (finished) => {
			if (finished) runOnJS(onRemove)(data.id_seat);
		});
	};

	const handleTypeChange = useCallback(
		(value) => updateSeatType(data.id_seat, value),
		[data.id_seat, updateSeatType]
	);

	return (
		<Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
			<View style={styles.item}>
				{teeth.map((_, index) => (
					<View key={index} style={[styles.tooth, { top: index * 15.7 }]} />
				))}
				<View style={styles.item_details}>
					<Text style={styles.item_text}>
						Locul: <Text style={styles.highlight}>{data.seat_no}</Text>
					</Text>
					<Text style={styles.item_text}>
						Randul: <Text style={styles.highlight}>{data.row_no}</Text>
					</Text>
					<Text style={styles.item_text}>
						Sectorul: <Text style={styles.highlight}>{data.room_name}</Text>
					</Text>
				</View>
				<Text style={styles.priceText}>{data.price} RON</Text>
				<Select
					selected={data.is_discounted === "1" ? "Redus" : "Intreg"}
					onChange={handleTypeChange}
					selectStyles={{
						position: "absolute",
						zIndex: 999,
						right: 40,
						top: 49,
						backgroundColor: "#2e2d2d",
						borderColor: "transparent",
						borderRadius: 6,
					}}
					textStyles={{ color: "lightgrey", fontWeight: "bold", fontSize: 13.8 }}
				/>
			</View>
			<TouchableOpacity onPress={handleRemove} style={styles.ticketList_removeButton}>
				<Text style={styles.ticketList_removeButton_text}>
					<EntypoIcon name="cross" size={21} />
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	ticketList: {
		paddingHorizontal: 15,
		position: "relative",
		backgroundColor: "#f5f5f6",
	},

	tooth: {
		position: "absolute",
		marginTop: 27.5,
		left: -3.5,
		width: 8.5,
		height: 8.5,
		borderRadius: 10,
		backgroundColor: "#f5f5f6",
		zIndex: 2,
	},

	item: {
		position: "relative",
		width: "84%",
		padding: 16,
		backgroundColor: "#363736",
		gap: 2.5,
		paddingHorizontal: 28,
		borderRadius: 10,
	},

	item_details: {
		gap: 2.8,
	},

	item_text: {
		fontWeight: "500",
		fontSize: 14.5,
		color: "white",
	},

	highlight: {
		color: "#74b7dd",
		fontWeight: "bold",
	},

	priceText: {
		fontWeight: "600",
		fontSize: 17,
		marginTop: 12,
		color: "#74b7dd",
	},

	ticketList_removeButton: {
		backgroundColor: "#d60303f0",
		borderRadius: 25,
		padding: 7,
		alignSelf: "flex-start",
		top: "47.5%",
		transform: [{ translateY: -17 }],
		marginHorizontal: "auto",
		left: 6,
	},

	ticketList_removeButton_text: {
		color: "white",
	},
});

export default TicketList;
