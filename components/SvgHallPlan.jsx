import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//hooks
import { useHandGestures } from "@/hooks/useHandGestures";

const SvgHallPlan = ({ roomsWithSeatsData, field_path, height = 355, read_only, style }) => {
	const [selectedRoomId, setSelectedRoomId] = React.useState(null);

	/* const location = roomsWithSeatsByLocation[locationId]; */
	const rooms = roomsWithSeatsData;
	const { gesture, animatedStyle } = useHandGestures();

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
								onPress={() => setSelectedRoomId(room.id_room)}
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
