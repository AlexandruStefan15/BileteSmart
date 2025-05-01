import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image, Dimensions } from "react-native";
import { eventsByLocation } from "@/data/events";
import { images } from "@/assets/images";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//components
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";

const EventDetailsScreen = ({ navigation, route }) => {
	const { locationId, eventId } = route.params;
	/* const currentEvent = eventsByLocation[locationId].find((event) => event.id_event == eventId); */
	/* console.log(eventId); */
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const savedTranslateX = useSharedValue(0);
	const savedTranslateY = useSharedValue(0);

	const MIN_SCALE = 1;
	const MAX_SCALE = 3;

	const pinchGesture = Gesture.Pinch()
		.onUpdate((event) => {
			let newScale = savedScale.value * event.scale;
			if (newScale < MIN_SCALE) newScale = MIN_SCALE;
			if (newScale > MAX_SCALE) newScale = MAX_SCALE;
			scale.value = newScale;
		})
		.onEnd(() => {
			savedScale.value = scale.value;
		});

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			const scaledWidth = SCREEN_WIDTH * scale.value;
			const scaledHeight = SCREEN_HEIGHT * scale.value;

			const boundX = (scaledWidth - SCREEN_WIDTH) / 2;
			const boundY = (scaledHeight - SCREEN_HEIGHT) / 2;

			let nextX = savedTranslateX.value + event.translationX;
			let nextY = savedTranslateY.value + event.translationY;

			if (nextX > boundX) nextX = boundX;
			if (nextX < -boundX) nextX = -boundX;

			if (nextY > boundY) nextY = boundY;
			if (nextY < -boundY) nextY = -boundY;

			translateX.value = nextX;
			translateY.value = nextY;
		})
		.onEnd(() => {
			savedTranslateX.value = translateX.value;
			savedTranslateY.value = translateY.value;
		});

	const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scale: scale.value },
		],
	}));

	return (
		<GestureDetector gesture={composedGesture}>
			<Animated.View style={[styles.container, animatedStyle]}>
				<SafeAreaView style={styles.screen}>
					<ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
						<Header variant="2" />
						<View style={styles.banner}>
							<Text style={styles.banner_title}>CS GLORIA 2018 BISTRITA NASAUD 39328462</Text>
							<Text style={styles.banner_subtitle}>Complex Sportiv Polivalent TeraPlast Arena</Text>
							<Text style={styles.banner_date}>Sâmbătă 3 Mai</Text>
							<View style={styles.banner_footer}>
								<Image style={styles.banner_footer_image} source={images.gloriaBistritaLogo} />
								<Text style={styles.banner_footer_time}>17:00 (CET)</Text>
								<Image style={styles.banner_footer_image} source={images.csmSlatinaLogo} />
							</View>
						</View>
						<SvgHallPlan /* locationId={locationId} eventId={eventId} */ />
						<Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
					</ScrollView>
				</SafeAreaView>
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	banner: {
		backgroundColor: "#242424",
		paddingBlock: 30,
		paddingTop: 66,
		paddingInline: 20,
		alignItems: "center",
		gap: 20,
	},

	banner_title: {
		color: "white",
		fontWeight: 500,
		fontSize: 15,
		textAlign: "center",
	},

	banner_subtitle: {
		color: "white",
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
	},

	banner_date: {
		color: "#5fa0c4",
		fontWeight: "bold",
		fontSize: 20,
	},

	banner_footer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	banner_footer_time: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},

	banner_footer_image: {
		width: 101,
		aspectRatio: 1 / 1,
	},
});

export default EventDetailsScreen;
