import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const CustomPressable = ({ children, isScrolling, style, onPress, ...props }) => {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable
			style={() => [
				styles.cardWrapper,
				style,
				!isScrolling && (pressed ? styles.pressedEffect : {}),
			]}
			onPress={() => {
				setPressed(true);
				setTimeout(() => setPressed(false), 135);
				if (onPress) onPress();
			}}
			onPressIn={() => setPressed(false)}
			disabled={isScrolling}
			{...props}
		>
			{children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressedEffect: {
		opacity: 0.6,
	},
});

export default CustomPressable;
