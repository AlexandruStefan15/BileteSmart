import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Svg, { Circle, Rect, Text as SvgText } from "react-native-svg";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import { initialData } from "@/data/chart";

const SeatingChart = ({ data = initialData }) => {
	const [selectedSeats, setSelectedSeats] = useState(new Set());

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

	return (
		<View style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
			<SvgPanZoom
				canvasWidth={2000}
				canvasHeight={1200}
				initialZoom={0.2}
				minScale={0.1}
				maxScale={3}
			>
				<Svg width="1200" height="800">
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

					{data.zones.flatMap((zone) =>
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

					{data.seats.map((seat) => (
						<SvgPanZoomElement
							key={seat.id}
							x={0}
							y={0}
							onClickRelease={(e) => {
								if (seat.occupied) return;

								const { locationX, locationY } = e.nativeEvent;
								const dx = locationX - seat.x;
								const dy = locationY - seat.y;
								const distance = Math.sqrt(dx * dx + dy * dy);

								const radius = 10;
								if (distance <= radius) {
									toggleSeat(seat.id);
								}
							}}
						>
							<Circle
								cx={seat.x}
								cy={seat.y}
								r={10}
								fill={seat.occupied ? "red" : selectedSeats.has(seat.id) ? "green" : "gray"}
								stroke="black"
							/>
							<SvgText x={seat.x} y={seat.y + 4} fontSize="10" textAnchor="middle" fill="white">
								{seat.nr}
							</SvgText>
						</SvgPanZoomElement>
					))}
				</Svg>
			</SvgPanZoom>
			{selectedSeats.size > 0 && (
				<View style={{ gap: 10, paddingInline: 10 }}>
					<Button title="Confirma" onPress={() => console.log([...selectedSeats])} />
					<Button title="Reseteaza" onPress={() => setSelectedSeats(new Set())} />
				</View>
			)}
		</View>
	);
};

export default SeatingChart;
