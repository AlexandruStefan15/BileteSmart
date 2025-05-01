import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

//data
import { roomsWithSeatsByLocation } from "@/data/hallPlans";

const SvgHallPlan = ({ locationId = 1 }) => {
	const location = roomsWithSeatsByLocation[locationId];
	if (!location) {
		return null;
	}

	console.log(location.field_path_d);

	return (
		<View>
			<Svg style={{ margin: "auto" }} width={355} height={355} fill="none" viewBox="0 0 775 851">
				<Path d={location.field_path_d} stroke="black" strokeWidth={3} strokeMiterlimit={10} />
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SvgHallPlan;
