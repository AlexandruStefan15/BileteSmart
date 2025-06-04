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

const TicketList = () => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
	const removeSeat = useSelectedSeats((state) => state.removeSeat);
	const [canShowTickets, setCanShowTickets] = useState(false);

	useEffect(() => {
		const task = InteractionManager.runAfterInteractions(() => {
			setTimeout(() => setCanShowTickets(true), 300);
		});
		return () => task.cancel();
	}, []);

	if (!canShowTickets) {
		return <Text style={{ margin: "auto" }}>Loading...</Text>;
	}

	if (selectedSeats.length === 0) {
		return <Text style={{ margin: "auto" }}>Momentan nu ai bilete în coș...</Text>;
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={styles.ticketList}
				data={selectedSeats}
				keyExtractor={(item) => item.id_seat.toString()}
				contentContainerStyle={{ gap: 12, marginVertical: 12, paddingBottom: 24 }}
				renderItem={({ item }) => <TicketItem item={item} onRemove={removeSeat} />}
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={10}
				removeClippedSubviews
			/>
		</View>
	);
};

const TicketItem = React.memo(({ item, onRemove }) => {
	const updateSeatType = useSelectedSeats((state) => state.updateSeatType);
	const translateX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const handleRemove = () => {
		translateX.value = withTiming(-500, { duration: 300 }, (finished) => {
			if (finished) runOnJS(onRemove)(item.id_seat);
		});
	};

	const handleTypeChange = useCallback(
		(value) => updateSeatType(item.id_seat, value),
		[item.id_seat, updateSeatType]
	);

	return (
		<Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
			<View style={styles.ticketList_item}>
				{teeth.map((_, index) => (
					<View key={index} style={[styles.tooth, { top: index * 15.5 }]} />
				))}
				<Text style={styles.ticketList_item_text}>
					Locul: <Text style={styles.highlight}>{item.seat_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Randul: <Text style={styles.highlight}>{item.row_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Sectorul: <Text style={styles.highlight}>{item.room_name}</Text>
				</Text>
				<Text style={styles.priceText}>{item.price} RON</Text>
				<Select
					selected={item.is_discounted === "1" ? "Redus" : "Intreg"}
					onChange={handleTypeChange}
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
});

const styles = StyleSheet.create({
	ticketList: {
		paddingHorizontal: 15,
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
		paddingHorizontal: 28,
		borderRadius: 12,
	},
	ticketList_item_text: {
		fontWeight: "500",
		fontSize: 14.5,
		color: "white",
	},
	highlight: {
		color: "#5fa0c4",
		fontWeight: "bold",
	},
	priceText: {
		fontWeight: "600",
		fontSize: 17,
		marginTop: 12,
		color: "#5fa0c4",
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
