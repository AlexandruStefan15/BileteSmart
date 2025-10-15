import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	interpolate,
} from "react-native-reanimated";

const AnimatedInput = ({
	label,
	value,
	onChangeText,
	style,
	inputStyle,
	labelStyle,
	secureTextEntry = false,
	placeholder,
	variant = "default",
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const progress = useSharedValue(value ? 1 : 0);
	const styles = getStyles(variant, inputStyle?.backgroundColor);

	useEffect(() => {
		progress.value = withTiming(isFocused || value ? 1 : 0, {
			duration: 200,
			easing: Easing.out(Easing.ease),
		});
	}, [isFocused, value]);

	const animatedLabelStyle_default = useAnimatedStyle(() => {
		return {
			top: interpolate(progress.value, [0, 1], [15, 5]),
			left: interpolate(progress.value, [0, 1], [12, 16]),
			fontSize: interpolate(progress.value, [0, 1], [16, 12]),
			fontWeight: progress.value > 0.5 ? "500" : "normal", // switch, not animate
		};
	});

	const animatedLabelStyle_3 = useAnimatedStyle(() => ({
		//variant 3
		top: progress.value > 0 ? 18 - progress.value * 26 : 15,
		fontSize: 16 - progress.value * 4, // shrinks font size
		backgroundColor: progress.value > 0 ? inputStyle?.backgroundColor || "white" : "transparent",
		fontWeight: progress.value > 0 ? "500" : "normal",
	}));

	if (variant == "2")
		//normal input
		return (
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={secureTextEntry}
				style={[styles.input, style, inputStyle]}
				placeholder={placeholder}
				{...props}
			/>
		);

	return (
		<View style={[styles.inputWrapper]}>
			<Animated.Text style={[styles.label, animatedLabelStyle_default, labelStyle]}>
				{label}
			</Animated.Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={secureTextEntry}
				style={[styles.input, inputStyle]}
				placeholder=""
				{...props}
			/>
		</View>
	);
};

const getStyles = (variant, inputBackgroundColor = "#f5f5f5") => {
	if (variant == "default")
		return StyleSheet.create({
			inputWrapper: {
				backgroundColor: inputBackgroundColor,
				borderRadius: 8,
				paddingHorizontal: 12,
				paddingBlock: 0,
				position: "relative",
			},
			label: {
				position: "absolute",
				left: 12,
				borderRadius: 3,
			},
			input: {
				fontSize: 16,
				color: "#000",
				paddingBottom: 7,
				paddingTop: 22,
				paddingLeft: 3,
			},
		});

	if (variant == "2")
		return StyleSheet.create({
			input: {
				fontSize: 16,
				color: "#000",
				padding: 0,
			},
		});
};

export default AnimatedInput;
