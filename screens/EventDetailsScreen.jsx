import React, { useState, useCallback } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Image,
	StatusBar,
	ScrollView,
	useWindowDimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// store
import { useSelectedSeats } from "@/store/store";

// utils
import { formatRomanianDate } from "@/utils/helpers";

// components
import SvgHallPlan from "@/components/SvgHallPlan";
import Header from "@/components/Header";
import Button from "@/components/Button";

// data
import roomsWithSeats from "@/data/roomsWithSeats.json";

const MIN_CARD = 280; // minimum workable height

const EventDetailsScreen = ({ navigation, route }) => {
	const [cardH, setCardH] = useState(MIN_CARD);
	const [cardW, setCardW] = useState(MIN_CARD);
	const [canScroll, setCanScroll] = useState(false);
	const insets = useSafeAreaInsets();
	const styles = getStyles();

	const { resetSeats } = useSelectedSeats();
	const { currentLocation, locationId, event } = route.params;

	// const rooms = roomsWithSeats[locationId][event.id_event].rooms;
	const rooms = roomsWithSeats[locationId][event.id_event].rooms;

	useFocusEffect(
		React.useCallback(() => {
			resetSeats();
			return () => {};
		}, [resetSeats])
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
				locationId,
				currentLocation,
			},
		});
	};

	const Body = (
		<>
			<Header variant="2" style={{ marginTop: 3 }} />

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

			{/* Body fills the rest of the screen */}
			<View style={styles.body}>
				{/* Card expands to all remaining vertical space */}
				<View style={[styles.card, { height: cardH }]} onLayout={onCardLayout}>
					{/* Pass the *actual* rendered height to the SVG plan */}
					<SvgHallPlan
						rooms={rooms}
						field={currentLocation.fieldSVG}
						width={cardW}
						height={"100%"}
						read_only
					/>
				</View>

				{/* Button sits below the card, auto height */}
				<View style={styles.actions}>
					{rooms.find((r) => r.free_seats > 0) ? (
						<Button
							style={styles.actions_button}
							styleText={styles.actions_button_text}
							onPress={handleSelectSector}
						>
							Selectează sectorul
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
			<SafeAreaView style={styles.screen}>
				{canScroll ? (
					<ScrollView
						contentContainerStyle={{ paddingBottom: insets.bottom, flexGrow: 1 }}
						bounces={false}
					>
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
			paddingTop: 52,
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

		/* BODY = remainder of the screen */
		body: {
			flex: 1,
			marginHorizontal: 20,
			marginTop: 5,
			marginBottom: 25,
			gap: 14,
		},

		/* CARD fills the remaining vertical space automatically */
		card: {
			flex: 1,
			backgroundColor: "white",
			borderRadius: 16,
			overflow: "hidden",
		},

		actions: {
			flex: 0,
		},

		actions_button: {
			borderRadius: 6,
			width: "100%",
		},

		actions_button_text: {
			fontSize: 17.1,
			fontWeight: "700",
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
