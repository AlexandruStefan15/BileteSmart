import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 2 - 21.5;

const ImageGallery = ({ images }) => {
	if (!images || images.length === 0) {
		return (
			<View style={styles.emptyState}>
				<Text style={styles.emptyStateText}>No images available</Text>
			</View>
		);
	}

	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={styles.imageContainer}
				onPress={() => {
					// Navigate or open modal
				}}
				activeOpacity={0.8}
			>
				{index == 3 && images.length > 4 ? (
					<ImageBackground source={{ uri: item.url }} style={{ flex: 1 }} resizeMode="cover">
						<View style={styles.overlay}>
							<Text style={styles.overlayText}>+{images.length - 4}</Text>
						</View>
					</ImageBackground>
				) : (
					<Image source={{ uri: item.url }} style={styles.image} />
				)}
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			data={images.slice(0, 4)} // Show only first 4
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
		marginBottom: 3,
	},
	imageContainer: {
		position: "relative",
		width: IMAGE_SIZE,
		aspectRatio: 100 / 76,
		borderRadius: 0,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		height: "100%",
		width: "100%",
		position: "absolute",
		inset: 0,
		zIndex: 999,
		/* ...StyleSheet.absoluteFillObject, */
		backgroundColor: "rgba(0, 0, 0, 0.46)",
		justifyContent: "center",
		alignItems: "center",
		/* experimental_backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))", */
	},
	overlayText: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
	},
});

export default ImageGallery;
