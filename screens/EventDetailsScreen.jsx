import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image, Dimensions } from "react-native";
import { eventsByLocation } from "@/data/events";
import { images } from "@/assets/images";

//utils
import { formatRomanianDate } from "@/utils/helpers";

//components
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import Button from "@/components/Button";

//data
import { roomsWithSeats } from "@/data/roomsWithSeats"; // to be fetched by locationId and eventId

const EventDetailsScreen = ({ navigation, route, selectedSeats, setSelectedSeats }) => {
	const { locationId, event, locationFieldPath } = route.params;
	/* const roomsWithSeatsData = roomsWithSeats[locationId][event.id_event].rooms; */
	const rooms = roomsWithSeats[1][129].rooms;

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#242424" }}>
				<Header variant="2" />
				<View style={styles.banner}>
					<Text style={styles.banner_title}>{event.title}</Text>
					<Text style={styles.banner_subtitle}>{event.subtitle}</Text>
					<Text style={styles.banner_date}>{formatRomanianDate(event.date)}</Text>
					<View style={styles.banner_footer}>
						<Image style={styles.banner_footer_image} source={event.logo_images[0]} />
						<Text style={styles.banner_footer_time}>17:00 (CET)</Text>
						<Image style={styles.banner_footer_image} source={event.logo_images[1]} />
					</View>
				</View>
				<View style={{ backgroundColor: "#242424" }}>
					<View style={styles.svgWrapper}>
						<SvgHallPlan
							rooms={rooms}
							field_path={locationFieldPath}
							read_only={true}
							selectedSeats={selectedSeats}
							setSelectedSeats={setSelectedSeats}
						/>
						<View>
							{rooms.find((room) => room.free_seats > 0) ? (
								<Button
									styleText={styles.svgWrapper_button_text}
									style={styles.svgWrapper_button}
									onPress={() =>
										navigation.navigate("RoomsPlanStack", {
											screen: "RoomsPlanScreen",
											params: {
												eventId: event.id_event,
												locationId: locationId,
												locationFieldPath: locationFieldPath,
											},
										})
									}
								>
									Selecteaza sectorul
								</Button>
							) : (
								<Text style={styles.noAvailableSeatsText}>Nu mai sunt locuri disponibile</Text>
							)}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	banner: {
		marginTop: -3,
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
		maxWidth: 380,
	},

	banner_footer_time: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},

	banner_footer_image: {
		width: 101,
		aspectRatio: 1 / 1,
		resizeMode: "contain",
	},

	// SVG HALL PLAN

	svgWrapper: {
		overflow: "hidden",
		backgroundColor: "#242424",
		margin: 8,
		marginBottom: 45,
		marginTop: 5,
		gap: 15,
	},

	svgWrapper_button: {
		flex: 1,
		borderRadius: 10,
		width: "100%",
	},

	svgWrapper_button_text: {
		fontWeight: "500",
	},

	noAvailableSeatsText: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
		marginTop: 10,
	},
});

export default EventDetailsScreen;
