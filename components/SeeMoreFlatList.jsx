import React, { useState } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";

//colors
import { Colors } from "@/constants";

const SeeMoreFlatList = ({
	data,
	renderItem,
	initialCount = 5,
	step = 5,
	keyExtractor,
	contentContainerStyle,
	windowSize,
	...props
}) => {
	const [visibleCount, setVisibleCount] = useState(initialCount);
	const visibleData = data.slice(0, visibleCount);

	const showMore = () => setVisibleCount((prev) => prev + step);

	return (
		<FlatList
			data={visibleData}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			windowSize={windowSize}
			ListFooterComponent={
				visibleCount < data.length ? (
					<TouchableOpacity style={styles.seeMoreButton} onPress={showMore}>
						<Text style={styles.seeMoreText}>Vezi mai mult</Text>
					</TouchableOpacity>
				) : null
			}
			contentContainerStyle={[styles.list, contentContainerStyle]}
			{...props}
		/>
	);
};

export default React.memo(SeeMoreFlatList);

const styles = StyleSheet.create({
	list: {
		padding: 16,
		gap: 12,
	},
	seeMoreButton: {
		marginBottom: 17,
		marginTop: 7,
		paddingBlock: 14,
		paddingInline: 29,
		alignSelf: "center",
		backgroundColor: "#636363ff",
		borderRadius: 30,
		borderWidth: 1,
		borderColor: "lightgrey",
	},
	seeMoreText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 13.85,
	},
});
