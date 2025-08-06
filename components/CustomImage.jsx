import { StyleSheet, Image, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";

const CustomImage = ({ item, x, index, size, spacer }) => {
	const [aspectRatio, setAspectRatio] = useState(1);

	const hasImage = Boolean(item?.image);
	const isRemote = typeof item?.image === "string";
	const source = isRemote ? { uri: item.image } : item?.image;

	// Get image dimensions to compute aspect ratio (local or remote)
	useLayoutEffect(() => {
		if (!hasImage) return;

		if (isRemote) {
			Image.getSize(
				item.image,
				(w, h) => setAspectRatio(w / h),
				() => setAspectRatio(1) // fallback on error
			);
		} else {
			const { width, height } = Image.resolveAssetSource(item.image);
			if (width && height) setAspectRatio(width / height);
		}
	}, [item?.image, isRemote, hasImage]);

	const style = useAnimatedStyle(() => {
		const scale = interpolate(
			x.value,
			[(index - 2) * size, (index - 1) * size, index * size],
			[0.8, 1, 0.8]
		);
		return { transform: [{ scale }] };
	});

	if (!hasImage) {
		return <View style={{ width: spacer }} key={index} />;
	}

	return (
		<View style={{ width: size }} key={index}>
			<Animated.View style={[styles.imageContainer, style]}>
				<Image source={source} style={[styles.image, { aspectRatio }]} resizeMode="cover" />
			</Animated.View>
		</View>
	);
};

export default CustomImage;

const styles = StyleSheet.create({
	imageContainer: {
		overflow: "hidden",
	},
	image: {
		width: "100%",
	},
});
