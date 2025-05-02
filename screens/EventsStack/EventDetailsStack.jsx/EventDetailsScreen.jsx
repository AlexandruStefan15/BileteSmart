import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image, Dimensions } from "react-native";
import { eventsByLocation } from "@/data/events";
import { images } from "@/assets/images";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//components
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import TicketsInfo from "@/components/TicketsInfo";
import Button from "@/components/Button";

//data
import { roomsWithSeats } from "@/data/hallPlans"; // to be fetched

const selectedSeats = [
	{ room: "A0", seat_number: 4, row: 7, price: 15 },
	{ room: "A0", seat_number: 5, row: 7, price: 15 },
];

const EventDetailsScreen = ({ navigation, route }) => {
	const { locationId, eventId, locationFieldPath } = route.params;
	const roomsWithSeatsData = roomsWithSeats[locationId][eventId];
	/* const currentEventDetails = eventsByLocation[locationId].find((event) => event.id_event == eventId); */

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#242424" }}>
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
				<View style={{ backgroundColor: "#242424" }}>
					<View style={styles.svgWrapper}>
						{/* <GestureDetector gesture={composedGesture}>
							<Animated.View style={[styles.svg_container, animatedStyle]}>
								<SvgHallPlan locationId={locationId} eventId={eventId} />
							</Animated.View>
						</GestureDetector> */}

						<SvgHallPlan roomsWithSeatsData={roomsWithSeatsData} field_path={locationFieldPath} />
						<View>
							<Button style={styles.svgWrapper_button}>Selecteaza zona</Button>
							{/* <Button style={styles.svgWrapper_button}>Vezi locuri selectate</Button> */}
						</View>
					</View>
				</View>
				{/* <TicketsInfo selectedSeats={selectedSeats} /> */}
			</ScrollView>
		</SafeAreaView>
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

	// SVG HALL PLAN

	svgWrapper: {
		overflow: "hidden",
		backgroundColor: "#242424",
		margin: 7,
		marginBottom: 40,
		marginTop: 5,
		gap: 20,
	},

	svgWrapper_button: {
		flex: 1,
		borderRadius: 10,
	},
});

export default EventDetailsScreen;
