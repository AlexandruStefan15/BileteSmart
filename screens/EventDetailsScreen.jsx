import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Image, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { eventsByLocation } from "@/data/events";
import { images } from "@/assets/images";

//store
import { useSelectedSeats } from "@/store/store";

//utils
import { formatRomanianDate } from "@/utils/helpers";

//components
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import Button from "@/components/Button";

//data
import roomsWithSeats from "@/data/roomsWithSeats.json"; // to be fetched by locationId and eventId

const EventDetailsScreen = ({ navigation, route }) => {
	const { locationId, event, locationFieldPath } = route.params;
	/* const roomsWithSeatsData = roomsWithSeats[locationId][event.id_event].rooms; */
	const rooms = roomsWithSeats[1][129].rooms;
	const { resetSeats } = useSelectedSeats();

	useFocusEffect(
		React.useCallback(() => {
			resetSeats();
			return () => {};
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<StatusBar barStyle={"light-content"} backgroundColor={"#242424"} />
			<ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#242424" }}>
				<Header variant="2" style={{ marginTop: 3 }} />
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
				<View>
					<View style={styles.svgWrapper}>
						<SvgHallPlan rooms={rooms} field_path={locationFieldPath} read_only={true} />
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
	screen: {
		flex: 1,
		backgroundColor: "#242424",
	},

	banner: {
		marginTop: -4,
		backgroundColor: "#242424",
		paddingBlock: 30,
		paddingTop: 68,
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
		marginTop: 8,
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

	svgWrapper: {
		overflow: "hidden",
		marginInline: 20,
		marginTop: 5,
		marginBottom: 25,
		gap: 14,
	},

	svgWrapper_button: {
		flex: 1,
		borderRadius: 8,
		width: "100%",
	},

	svgWrapper_button_text: {
		fontSize: 17,
		fontWeight: "600",
		letterSpacing: 0.5,
	},

	noAvailableSeatsText: {
		color: "red",
		fontSize: 16,
		textAlign: "center",
		marginTop: 10,
	},
});

export default EventDetailsScreen;
