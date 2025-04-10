import React, { useState, useRef } from "react";
import { View, Button, StyleSheet } from "react-native";
import Svg, { Circle, G, Text as SvgText } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import { initialData } from "@/data/chart";

const MIN_SCALE = 0.02;
const MAX_SCALE = 3;

const SeatingChart = ({ data = initialData }) => {
	const [selectedSeats, setSelectedSeats] = useState(new Set());
	const isPanning = useSharedValue(false);
	const scale = useSharedValue(1);
	const panX = useSharedValue(0);
	const panY = useSharedValue(0);
	const savedScale = useSharedValue(1);
	const savedPan = useSharedValue({ x: 0, y: 0 });

	const toggleSeat = (seatId) => {
		setSelectedSeats((prev) => {
			const newSelection = new Set([...prev]);
			if (newSelection.has(seatId)) {
				newSelection.delete(seatId);
			} else {
				newSelection.add(seatId);
			}
			return newSelection;
		});
	};

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			const newScale = savedScale.value * e.scale;
			scale.value = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));
		})
		.onEnd(() => {
			savedScale.value = Math.max(MIN_SCALE, Math.min(scale.value, MAX_SCALE));
		});

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			panX.value = savedPan.value.x + e.translationX;
			panY.value = savedPan.value.y + e.translationY;

			isPanning.value = true;
		})
		.onEnd(() => {
			savedPan.value = { x: panX.value, y: panY.value };
			isPanning.value = false;
		});

	const canvasGesture = Gesture.Simultaneous(pinchGesture, panGesture);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: panX.value }, { translateY: panY.value }, { scale: scale.value }],
	}));

	return (
		<GestureDetector gesture={canvasGesture}>
			<Animated.View style={{ flex: 1, backgroundColor: "black" }}>
				<Animated.View style={animatedStyle}>
					<Svg width={2000} height={1200}>
						{data.zones.map((zone) => (
							<SvgText
								key={zone.name}
								x={zone.x}
								y={zone.y}
								fontSize="50"
								fontWeight="bold"
								fill="white"
							>
								{zone.name}
							</SvgText>
						))}

						{data.zones.map((zone) =>
							zone.rows.map((row) => (
								<SvgText
									key={`${zone.name}-${row.name}`}
									x={row.x - 20}
									y={row.y}
									fontSize="13"
									fontWeight="bold"
									fill="white"
								>
									{row.name}
								</SvgText>
							))
						)}

						{data.seats.map((seat) => {
							return (
								<React.Fragment key={seat.id}>
									<Circle
										onPress={() => {
											if (!seat.occupied) toggleSeat(seat.id);
										}}
										cx={seat.x}
										cy={seat.y}
										r={10}
										fill={seat.occupied ? "red" : selectedSeats.has(seat.id) ? "green" : "gray"}
										stroke="black"
										onResponderMove={(_) => {}}
									/>
									<SvgText x={seat.x} y={seat.y + 4} fontSize="10" textAnchor="middle" fill="white">
										{seat.nr}
									</SvgText>
								</React.Fragment>
							);
						})}
					</Svg>
				</Animated.View>

				{selectedSeats.size > 0 && (
					<View style={styles.buttonsContainer}>
						<Button title="Confirma" onPress={() => console.log([...selectedSeats])} />
						<Button title="Reseteaza" onPress={() => setSelectedSeats(new Set())} />
					</View>
				)}
			</Animated.View>
		</GestureDetector>
	);
};

export default SeatingChart;

const styles = StyleSheet.create({
	buttonsContainer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		gap: 10,
	},
});
