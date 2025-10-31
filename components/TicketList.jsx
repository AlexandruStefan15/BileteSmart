import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, InteractionManager } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

import { useSelectedSeats } from "@/store";
import EntypoIcon from "react-native-vector-icons/Entypo";

//components

import Ticket from "./Ticket";

const TicketList = React.memo(({ style }) => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
	const removeSeat = useSelectedSeats((state) => state.removeSeat);

	const keyExtractor = React.useCallback((seat) => seat.id_seat.toString(), []);
	const renderItem = React.useCallback(
		({ item }) => <TicketContainer data={item} onRemove={removeSeat} />,
		[removeSeat]
	);

	if (selectedSeats.length === 0) {
		return <Text style={{ margin: "auto" }}>Momentan nu ai bilete în coș...</Text>;
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={[styles.ticketList, style]}
				data={selectedSeats}
				keyExtractor={keyExtractor}
				contentContainerStyle={{ gap: 12, paddingBlock: 15 }}
				renderItem={renderItem}
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={10}
				removeClippedSubviews
			/>
		</View>
	);
});

const TicketContainer = React.memo(({ data, onRemove }) => {
	const translateX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const handleRemove = () => {
		translateX.value = withTiming(-500, { duration: 300 }, (finished) => {
			if (finished) runOnJS(onRemove)(data.id_seat);
		});
	};

	return (
		<Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
			<Ticket data={data} />
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
