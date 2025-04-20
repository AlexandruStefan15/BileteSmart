import React, { useState } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

const DelayedTouchable = ({ onPress, children, activeOpacity = 0.5, style }) => {
	const [opacity] = useState(new Animated.Value(1));

	const handlePress = () => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: activeOpacity,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 110,
				useNativeDriver: true,
			}),
		]).start(() => {
			if (onPress) onPress();
		});
	};

	return (
		<Pressable
			android_ripple={{ color: "rgba(255, 255, 255, 0.3)", borderless: false }}
			onPress={handlePress}
		>
			<Animated.View style={[style, { opacity }]}>{children}</Animated.View>
		</Pressable>
	);
};

export default DelayedTouchable;
