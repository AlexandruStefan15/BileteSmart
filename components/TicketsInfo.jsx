import React, { useContext } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
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

const TicketsInfo = ({}) => {
	const { selectedSeats, removeSeat } = useSelectedSeats();
	const teethCount = 6;
	const teeth = Array.from({ length: teethCount });

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
					Locul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.seat_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Randul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.row_no}</Text>
				</Text>
				<Text style={styles.ticketList_item_text}>
					Sectorul: <Text style={{ color: "#1a91d4", fontWeight: "bold" }}>{item.room_name}</Text>
				</Text>
				<Text style={{ fontWeight: "600", fontSize: 17, marginTop: 12, color: "white" }}>
					{item.price} RON
				</Text>
				<View
					style={{
						width: 115,
						height: 35,
						/* position:"absolute", */
						zIndex: 999,
						/* 	right: 35,
						top: 50, */
						borderWidth: 1.5,
						borderColor: "white",
					}}
				>
					<Picker
						style={{ color: "white", height: 50, top: -10, width: 115 }}
						selectedValue={item.is_for_child === "1" ? "child" : "adult"}
						onValueChange={(value) => updateSeatType(item.id_seat, value)}
						dropdownIconColor="white"
					>
						<Picker.Item style={{ fontSize: 14 }} label="Adult" value="adult" />
						<Picker.Item style={{ fontSize: 14 }} label="Child" value="child" />
					</Picker>
				</View>
			</View>
			<TouchableOpacity onPress={handleRemove} style={styles.ticketList_removeButton}>
				<Text style={styles.ticketList_removeButton_text}>
					<EntypoIcon name="cross" size={20} />
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
		padding: 15.5,
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
		paddingVertical: 7,
		paddingHorizontal: 7,
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
