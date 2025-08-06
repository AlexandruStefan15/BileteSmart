import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 2 - 22;

const ImageGallery = ({ images }) => {
	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={styles.imageContainer}
				onPress={() => {
					// Navigate or open modal
				}}
				activeOpacity={0.8}
			>
				<Image source={{ uri: item.url }} style={styles.image} />
			</TouchableOpacity>
		);
	};

	if (!images || images.length === 0) {
		return (
			<View style={styles.emptyState}>
				<Text style={styles.emptyStateText}>No images available</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={images.slice(0, 4)} // Show only first 5
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			numColumns={2}
			columnWrapperStyle={styles.row}
			scrollEnabled={false}
		/>
	);
};

const styles = StyleSheet.create({
	row: {
		justifyContent: "space-between",
		marginBottom: 5,
	},
	imageContainer: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: 0,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center",
		alignItems: "center",
	},
	overlayText: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
	},
});

export default ImageGallery;
