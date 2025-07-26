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
	...rest
}) => {
	const [visibleCount, setVisibleCount] = useState(initialCount);
	const visibleData = data.slice(0, visibleCount);

	const showMore = () => setVisibleCount((prev) => prev + step);

	return (
		<FlatList
			data={visibleData}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListFooterComponent={
				visibleCount < data.length ? (
					<TouchableOpacity style={styles.seeMoreButton} onPress={showMore}>
						<Text style={styles.seeMoreText}>Vezi mai multe</Text>
					</TouchableOpacity>
				) : null
			}
			contentContainerStyle={[styles.list, contentContainerStyle]}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		padding: 16,
		gap: 12,
	},
	seeMoreButton: {
		marginBottom: 18,
		marginTop: 7,
		paddingBlock: 14,
		paddingInline: 30,
		alignSelf: "center",
		backgroundColor: Colors.secondary,
		borderRadius: 30,
	},
	seeMoreText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
	},
});

export default SeeMoreFlatList;
