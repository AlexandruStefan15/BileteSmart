import { StyleSheet, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

const Pagination = ({ data, x, size }) => {
	return (
		<View style={styles.paginationContainer}>
			{data.map((_, i) => {
				return <Dot key={i} x={x} index={i} size={size} />;
			})}
		</View>
	);
};

export default Pagination;

const Dot = ({ x, index, size }) => {
	const animatedDotStyle = useAnimatedStyle(() => {
		const widthAnimation = interpolate(
			x.value,
			[(index - 1) * size, index * size, (index + 1) * size],
			[10, 20, 10],
			Extrapolation.CLAMP
		);
		const opacityAnimation = interpolate(
			x.value,
			[(index - 1) * size, index * size, (index + 1) * size],
			[0.5, 1, 0.5],
			Extrapolation.CLAMP
		);
		return {
			width: widthAnimation,
			opacity: opacityAnimation,
		};
	});
	return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

const styles = StyleSheet.create({
	paginationContainer: {
		flexDirection: "row",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},

	dots: {
		height: 10,
		backgroundColor: "orange",
		marginHorizontal: 10,
		borderRadius: 5,
	},
});
