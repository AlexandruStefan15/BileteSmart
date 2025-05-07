import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path, Image as SvgImage } from "react-native-svg";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

//hooks
import { useHandGestures } from "@/hooks/useHandGestures";

//components
import StadiumMarkerSvg from "./StadiumMarkerSvg";

const SvgHallPlan = ({
	roomsWithSeatsData,
	field_path,
	height = 355,
	read_only,
	style,
	selectRoom,
	selectSeats,
	seats,
	fieldPosition, // only for seats screen
}) => {
	const [selectedRoomId, setSelectedRoomId] = React.useState(null);
	/* const location = roomsWithSeatsByLocation[locationId]; */
	const rooms = roomsWithSeatsData;
	const { gesture, animatedStyle } = useHandGestures();
	const navigation = useNavigation();

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
		//aici
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
						<StadiumMarkerSvg
							style={{ position: "absolute", [fieldPosition === "top" ? "top" : "bottom"]: 120 }}
						/>
						<Svg width={345} height={"100%"} viewBox="0 0 115 100">
							{seats.map((seat) => (
								<Path
									onPress={() => {}}
									onResponderMove={() => {}}
									key={seat.id_seat}
									d={seat.path_d}
									fill="#85cb3c"
								/>
							))}
						</Svg>
					</Animated.View>
					{/* <View style={styles.buttonsContainer}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>Butoane...</Text>
				</View> */}
				</Animated.View>
			</GestureDetector>
		);
};

const styles = StyleSheet.create({
	/* buttonsContainer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		gap: 10,
	}, */
});

export default SvgHallPlan;
