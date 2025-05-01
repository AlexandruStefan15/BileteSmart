import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

//data
import { roomsWithSeatsByLocation } from "@/data/hallPlans";

const SvgHallPlan = ({ locationId = 1 }) => {
	const location = roomsWithSeatsByLocation[locationId];
	const field_path = location.field_path_d;
	const rooms = location.rooms;

	if (!location) {
		return null;
	}

	console.log(location.field_path_d);

	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				paddingBlock: 40,
				backgroundColor: "white",
				borderRadius: 10,
			}}
		>
			<Svg style={{ margin: "auto" }} width={355} height={355} fill="none" viewBox="0 0 775 851">
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
};

const styles = StyleSheet.create({});

export default SvgHallPlan;
