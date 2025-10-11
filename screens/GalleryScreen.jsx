import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GalleryScreen = ({ navigation, route }) => {
	const { images } = route.params;

	return (
		<SafeAreaView style={styles.screen}>
			<FlatList
				data={images}
				renderItem={({ item: image }) => <Image source={{ uri: image.url }} style={styles.image} />}
				keyExtractor={(image) => image.id.toString()}
				style={styles.list}
				contentContainerStyle={styles.contentContainerList}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
	},

	list: {
		flex: 1,
	},

	contentContainerList: {
		gap: 7,
	},

	image: {
		width: "100%",
		aspectRatio: 100 / 70,
		resizeMode: "cover",
	},
});

export default GalleryScreen;
