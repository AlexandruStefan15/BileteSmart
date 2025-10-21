import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	interpolate,
	runOnUI,
} from "react-native-reanimated";

export default function Input({
	label = "placeholder label",
	value,
	onChangeText,
	inputStyle,
	labelStyle,
	variant = "normal",
	...props
}) {
	const progress = useSharedValue(value ? 1 : 0);
	const inputRef = useRef(null);
	const styles = getStyles(variant, inputStyle?.backgroundColor);

	const handleFocus = () => {
		runOnUI(() => {
			progress.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) });
		})();
	};

	const handleBlur = () => {
		if (!value) {
			runOnUI(() => {
				progress.value = withTiming(0, { duration: 180, easing: Easing.out(Easing.ease) });
			})();
		}
	};

	if (variant == "animated") {
		const animatedLabelStyle = useAnimatedStyle(() => ({
			top: interpolate(progress.value, [0, 1], [15, 5]),
			left: interpolate(progress.value, [0, 1], [13, 14.5]),
			fontSize: interpolate(progress.value, [0, 1], [14, 12]),
			fontWeight: progress.value > 0.5 ? "500" : labelStyle?.fontWeight || styles.label.fontWeight,
			color: progress.value > 0 ? "grey" : labelStyle?.color || styles.label.color,
		}));

		return (
			// animated label variant
			<View style={[styles.inputWrapper]}>
				<Animated.Text style={[styles.label, animatedLabelStyle, labelStyle]}>
					{label}
				</Animated.Text>
				<TextInput
					ref={inputRef}
					value={value}
					onChangeText={onChangeText}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={[styles.input, inputStyle]}
					{...props}
					placeholder={""}
				/>
			</View>
		);
	}

	return (
		// normal variant
		<TextInput
			ref={inputRef}
			value={value}
			onChangeText={onChangeText}
			style={[styles.input, inputStyle]}
			{...props}
		/>
	);
}

const getStyles = (variant, inputBackgroundColor = "#f5f5f5") => {
	if (variant == "animated")
		return StyleSheet.create({
			inputWrapper: {
				backgroundColor: inputBackgroundColor,
				borderRadius: 8,
				paddingHorizontal: 12,
				position: "relative",
				borderWidth: 1,
				borderColor: "#ccc",
			},
			label: {
				position: "absolute",
				left: 12,
				borderRadius: 3,
				color: "#696969ff",
				fontWeight: "400",
			},
			input: {
				fontSize: 16,
				color: "black",
				paddingBottom: 7,
				paddingTop: 23,
				paddingLeft: 3,
			},
		});

	// normal variant
	return StyleSheet.create({
		input: {
			backgroundColor: inputBackgroundColor,
			fontSize: 16,
			color: "black",
			paddingVertical: 12,
			paddingHorizontal: 10,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: "#ccc",
			textAlignVertical: "center",
		},
	});
};
