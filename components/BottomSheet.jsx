/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate,
	runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//context
import { useBottomSheetMinimizedContext } from "@/context/BottomSheetMinimizedContext";

const BottomSheet = forwardRef(
	(
		{
			activeHeight,
			children,
			backgroundColor,
			backDropColor,
			closeOnExternalInteraction,
			sharedTopAnimation,
		},
		ref
	) => {
		const inset = useSafeAreaInsets();
		const { height } = Dimensions.get("screen");
		const collapsedOffset = height - 105;
		const newActiveHeight = height - activeHeight - 35;
		const topAnimation = sharedTopAnimation || useSharedValue(height);
		const context = useSharedValue(0);
		const { isBottomSheetCollapsed } = useBottomSheetMinimizedContext();

		const setCollapsed = (value) => {
			isBottomSheetCollapsed.current = value;
		};

		const expand = useCallback(() => {
			"worklet";
			topAnimation.value = withSpring(newActiveHeight, {
				damping: 100,
				stiffness: 400,
			});
			runOnJS(setCollapsed)(false);
		}, []);

		const collapse = useCallback(() => {
			"worklet";
			topAnimation.value = withSpring(collapsedOffset, {
				damping: 100,
				stiffness: 400,
			});
			runOnJS(setCollapsed)(true);
		}, []);

		const close = useCallback(() => {
			"worklet";
			topAnimation.value = withSpring(height, {
				damping: 100,
				stiffness: 400,
			});
			runOnJS(setCollapsed)(false);
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				expand,
				collapse,
				close,
			}),
			[expand, collapse, close]
		);

		const animationStyle = useAnimatedStyle(() => {
			const top = topAnimation.value;
			return {
				top,
			};
		});
		const backDropAnimation = useAnimatedStyle(() => {
			const opacity = interpolate(topAnimation.value, [height, newActiveHeight], [0, 0.5]);
			const display = opacity === 0 ? "none" : "flex";
			return {
				opacity,
				display,
			};
		});

		const pan = Gesture.Pan()
			.onBegin(() => {
				context.value = topAnimation.value;
			})
			.onUpdate((event) => {
				if (event.translationY < 0) {
					topAnimation.value = withSpring(newActiveHeight, {
						damping: 100,
						stiffness: 400,
					});
				} else {
					topAnimation.value = withSpring(context.value + event.translationY, {
						damping: 100,
						stiffness: 400,
					});
				}
			})
			.onEnd(() => {
				if (topAnimation.value > newActiveHeight + 50) {
					//collapse
					topAnimation.value = withSpring(collapsedOffset, {
						damping: 100,
						stiffness: 400,
					});
					runOnJS(setCollapsed)(true);
				} else {
					//remain open
					topAnimation.value = withSpring(newActiveHeight, {
						damping: 100,
						stiffness: 400,
					});
				}
			});

		return (
			<>
				{closeOnExternalInteraction ? (
					<TouchableWithoutFeedback
						onPress={() => {
							close();
						}}
					>
						<Animated.View
							style={[styles.backDrop, backDropAnimation, { backgroundColor: backDropColor }]}
						/>
					</TouchableWithoutFeedback>
				) : (
					<></>
				)}
				<GestureDetector gesture={pan}>
					<Animated.View
						style={[
							styles.container,
							animationStyle,
							{
								height: activeHeight,
								backgroundColor: backgroundColor,
								paddingBottom: inset.bottom,
							},
						]}
					>
						<View style={styles.lineContainer}>
							<View style={styles.line} />
						</View>
						{children}
					</Animated.View>
				</GestureDetector>
			</>
		);
	}
);

export default BottomSheet;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		bottom: 0,
		left: 0,
		right: 0,
	},
	lineContainer: {
		marginVertical: 10,
		alignItems: "center",
	},
	line: {
		width: 50,
		height: 4,
		backgroundColor: "grey",
		borderRadius: 35,
	},
	backDrop: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: "none",
	},
});
