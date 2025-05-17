import React, { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Svg, { Path, Image as SvgImage } from "react-native-svg";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

//colors
import { Colors } from "@/constants";

//hooks
import { useHandGestures } from "@/hooks/useHandGestures";
import { useSelectedSeatsContext } from "@/hooks/useSelectedSeats";

//components
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
	fieldPosition, // only for seats screen
	...props
}) => {
	const { selectedSeats, setSelectedSeats } = useSelectedSeatsContext();
	const [seatIds, setSeatIds] = React.useState(new Set());
	const [selectedRoomId, setSelectedRoomId] = React.useState(null);
	const { gesture, animatedStyle } = useHandGestures();
	const navigation = useNavigation();

	const hasSeat = (set, seatId) => {
		for (const seat of set) {
			if (seat.id_seat == seatId) return true;
		}
		return false;
	};

	const toggleSeat = (seat) => {
		let isSelected = false;

		setSelectedSeats((prev) => {
			const updated = new Set(prev);
			for (const s of updated) {
				if (s.id_seat == seat.id_seat) {
					updated.delete(s);
					isSelected = true;
					break;
				}
			}

			if (!isSelected) {
				updated.add(seat);
			}

			return updated;
		});

		setSeatIds((prev) => {
			const updatedIds = new Set(prev);
			if (isSelected) {
				updatedIds.delete(seat.id_seat);
			} else {
				updatedIds.add(seat.id_seat);
			}
			return updatedIds;
		});
	};

	if (read_only)
		return (
			<View
				style={[
					{
						justifyContent: "center",
						alignItems: "center",
						paddingBlock: 40,
						backgroundColor: "white",
						borderRadius: 10,
					},
					style,
				]}
			>
				<Svg
					style={{ margin: "auto" }}
					width={355}
					height={height}
					fill="none"
					viewBox="0 0 775 851"
				>
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

	if (selectRoom)
		return (
			<GestureDetector gesture={gesture}>
				<Animated.View style={[{ flex: 1 }, style]}>
					<Animated.View style={[styles.svg_container, animatedStyle]}>
						<Svg
							style={{ margin: "auto" }}
							width={355}
							height={height}
							fill="none"
							viewBox="0 0 775 851"
						>
							<Path d={field_path} stroke="black" strokeWidth={3} strokeMiterlimit={10} />
							{rooms.map((room) => (
								<Path
									onPress={() =>
										room.free_seats > 0 &&
										!room.read_only &&
										navigation.navigate("SeatsPlanScreen", { roomId: room.id_room })
									}
									onResponderMove={() => {}}
									key={room.id_room}
									d={room.path_d}
									fill={
										selectedRoomId === room.id_room && room.free_seats > 0 && !room.read_only
											? "blue"
											: room.free_seats > 0 && !room.read_only
											? "green"
											: "#BFBFBF"
									}
								/>
							))}
						</Svg>
					</Animated.View>
				</Animated.View>
			</GestureDetector>
		);

	if (selectSeats)
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
							{currentRoom.seats?.map((seat) => (
								<Path
									onPress={() => {
										if (!seat.busy) toggleSeat(seat);
									}}
									onResponderMove={() => {}}
									key={seat.id_seat}
									d={seat.path_d}
									fill={
										seat.busy
											? "gray"
											: hasSeat(selectedSeats, seat.id_seat)
											? "#5fa0c4"
											: "#85cb3c"
									}
								/>
							))}
							{currentRoom.rows_path_d?.map((row, index) => (
								<Path key={index} d={row} fill="black" stroke="black" strokeWidth={0.05} />
							))}
						</Svg>
					</Animated.View>
					{/* {selectedSeats.size > 0 && (
						<View style={styles.buttonsContainer}>
							<Button
								color={Colors.primary}
								title="Confirma"
								onPress={() => console.log([...selectedSeats])}
							/>
							<Button color={Colors.primary} title="Reseteaza" onPress={() => resetSeats()} />
						</View>
					)} */}
				</Animated.View>
			</GestureDetector>
		);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 10,
	},
});

export default SvgHallPlan;
