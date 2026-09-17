import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Image, StatusBar, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";

// store
import { useSelectedSeatsStore } from "@/store";

// utils
import { formatRomanianDate } from "@/utils/helpers";

// components
import InteractivePlan from "@/components/InteractivePlan";
import Header from "@/components/Header";
import Button from "@/components/Button";

// data
import roomsWithSeats from "@/data/roomsWithSeats.json";
import { locations } from "@/data/locations"; // to be fetched

const MIN_CARD = 275; // minimum workable height

const EventDetailsScreen = ({ navigation, route }) => {
	const resetSeats = useSelectedSeatsStore((s) => s.resetSeats);
	const [cardH, setCardH] = useState(MIN_CARD);
	const [cardW, setCardW] = useState(MIN_CARD);
	const [canScroll, setCanScroll] = useState(false);
	const insets = useSafeAreaInsets();
	const styles = getStyles();
	const { event, currentLocation } = route.params;

	const location = currentLocation || locations.find((location) => location.id == event.location.id);

	// const rooms = roomsWithSeats[locationId][event.id_event].rooms;
	const rooms = roomsWithSeats[location.id][event.id_event].rooms;

	useFocusEffect(
		React.useCallback(() => {
			resetSeats();
		}, [resetSeats]),
	);

	const onCardLayout = useCallback((e) => {
		const h = Math.floor(e.nativeEvent.layout.height);
		const w = Math.floor(e.nativeEvent.layout.width);
		setCardW(w - 100);

		if (h < MIN_CARD) {
			setCardH(MIN_CARD);
			setCanScroll(true);
		} else setCardH(h);
	}, []);

	const handleSelectSector = () => {
		navigation.navigate("RoomsPlanStack", {
			screen: "RoomsPlanScreen",
			params: {
				eventId: event.id_event,
				currentLocation: location,
			},
		});
	};

	const Body = (
		<>
			{/* Banner takes its natural height */}
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

			{/* wrapper fills the rest of the screen */}
			<View style={styles.wrapper}>
				{/* Card expands to all remaining vertical space */}
				<View style={[styles.card, { height: cardH }]} onLayout={onCardLayout}>
					{/* Pass the *actual* rendered height to the SVG plan */}
					<InteractivePlan read_only rooms={rooms} field={location.fieldSVG} width={cardW} height={"100%"} />
				</View>
				{/* Button sits below the card, auto height */}
				<View style={styles.actions}>
					{rooms.find((r) => r.free_seats > 0) ? (
						<Button variant="4" onPress={handleSelectSector}>
							Vezi plan interactiv
						</Button>
					) : (
						<Text style={styles.noAvailableSeatsText}>Nu mai sunt locuri disponibile</Text>
					)}
				</View>
			</View>
		</>
	);

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#242424" />
			<Header variant="2" style={{ marginTop: 3 }} backButtonSize={25.5} />
			<SafeAreaView style={styles.screen}>
				{canScroll ? (
					<ScrollView contentContainerStyle={{ paddingBottom: insets.bottom, flexGrow: 1 }} bounces={false}>
						{Body}
					</ScrollView>
				) : (
					<View style={{ flex: 1, paddingBottom: 5 }}>{Body}</View>
				)}
			</SafeAreaView>
		</>
	);
};

const getStyles = () =>
	StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: "#242424",
		},

		banner: {
			paddingTop: 69,
			paddingBottom: 30,
			paddingHorizontal: 20,
			alignItems: "center",
			gap: 20,
		},

		banner_title: {
			color: "white",
			fontWeight: "500",
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
			aspectRatio: 1,
			resizeMode: "contain",
		},

		wrapper: {
			flex: 1,
			marginTop: 5,
			paddingHorizontal: 20,
			paddingBottom: 20,
			gap: 15,
			justifyContent: "space-between",
		},

		card: {
			flex: 1,
			backgroundColor: "white",
			borderRadius: 16,
			overflow: "hidden",
		},

		actions: {
			flex: 0,
		},

		noAvailableSeatsText: {
			color: "red",
			fontSize: 16,
			textAlign: "center",
			marginTop: 8,
			paddingBlock: 4,
			marginBottom: 1,
		},
	});

export default EventDetailsScreen;
