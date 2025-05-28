import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

// store
import { useSelectedSeats } from "@/store/store";

// hooks
import { useHandGestures } from "@/hooks/useHandGestures";

// components
import StadiumMarkerSvg from "./StadiumMarkerSvg";

const SvgHallPlan = ({
	rooms,
	currentRoom,
	field_path,
	height = 355,
	read_only,
	style,
	selectRoom,
	selectSeats,
	fieldPosition,
}) => {
	const selectedSeats = useSelectedSeats((state) => state.selectedSeats);
	const toggleSeat = useSelectedSeats((state) => state.toggleSeat);

	const navigation = useNavigation();
	const { gesture, animatedStyle } = useHandGestures();
	const [selectedRoomId, setSelectedRoomId] = useState(null);

	const selectedSeatIds = useMemo(
		() => new Set(selectedSeats.map((s) => s.id_seat)),
		[selectedSeats]
	);

	const renderSeatPaths = useMemo(() => {
		return currentRoom?.seats?.map((seat) => {
			const isSelected = selectedSeatIds.has(seat.id_seat);
			return (
				<Path
					key={seat.id_seat}
					d={seat.path_d}
					fill={seat.busy ? "gray" : isSelected ? "#5fa0c4" : "#85cb3c"}
					onPress={() => !seat.busy && toggleSeat(seat)}
					onResponderMove={() => {}}
				/>
			);
		});
	}, [currentRoom?.seats, selectedSeatIds, toggleSeat]);

	const renderRoomPaths = useMemo(() => {
		return rooms?.map((room) => (
			<Path
				key={room.id_room}
				d={room.path_d}
				fill={
					selectedRoomId === room.id_room && room.free_seats > 0 && !room.read_only
						? "blue"
						: room.free_seats > 0 && !room.read_only
						? "green"
						: "#BFBFBF"
				}
				onPress={() =>
					room.free_seats > 0 &&
					!room.read_only &&
					navigation.navigate("SeatsPlanStack", {
						screen: "SeatsPlanScreen",
						params: { roomId: room.id_room },
					})
				}
				onResponderMove={() => {}}
			/>
		));
	}, [rooms, selectedRoomId]);

	if (read_only) {
		return (
			<View style={[styles.readOnlyWrapper, style]}>
				<Svg width={300} height={300} fill="none" viewBox="0 0 775 851">
					<Path d={field_path} stroke="black" strokeWidth={3} strokeMiterlimit={10} />
					{rooms.map((room) => (
						<Path
							key={room.id_room}
							d={room.path_d}
							fill={room.free_seats > 0 && !room.read_only ? "green" : "#BFBFBF"}
						/>
					))}
				</Svg>
			</View>
		);
	}

	if (selectRoom) {
		return (
			<GestureDetector gesture={gesture}>
				<Animated.View style={[{ flex: 1 }, style]}>
					<Animated.View
						style={[
							styles.svg_container,
							animatedStyle,
							{ flex: 1, justifyContent: "center", alignItems: "center" },
						]}
					>
						<Svg width={355} height={height} fill="none" viewBox="0 0 775 851">
							<Path d={field_path} stroke="black" strokeWidth={3} strokeMiterlimit={10} />
							{renderRoomPaths}
						</Svg>
					</Animated.View>
				</Animated.View>
			</GestureDetector>
		);
	}

	if (selectSeats) {
		return (
			<GestureDetector gesture={gesture}>
				<Animated.View style={[{ flex: 1, width: "100%" }, style]}>
					<Animated.View
						style={[
							styles.svg_container,
							animatedStyle,
							{ flex: 1, justifyContent: "center", alignItems: "center" },
						]}
					>
						<StadiumMarkerSvg
							width={"90%"}
							style={{
								position: "absolute",
								[fieldPosition === "top" ? "top" : "bottom"]: 100,
							}}
						/>
						<Svg width={"90%"} height={"100%"} viewBox="0 0 108 100">
							{renderSeatPaths}
							{currentRoom?.rows_path_d?.map((row, index) => (
								<Path key={index} d={row} fill="black" stroke="black" strokeWidth={0.05} />
							))}
						</Svg>
					</Animated.View>
				</Animated.View>
			</GestureDetector>
		);
	}
};

const styles = StyleSheet.create({
	svg_container: {
		width: "100%",
	},
	readOnlyWrapper: {
		justifyContent: "center",
		alignItems: "center",
		paddingBlock: 25,
		backgroundColor: "white",
		borderRadius: 10,
	},
});

export default SvgHallPlan;
