import React from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Text,
	Image,
	ImageBackground,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants";
import { eventLocations } from "@/data/locations";
import Ripple from "react-native-material-ripple";

//utils
import { formatDateToRomanian } from "@/utils/helpers";

//icons
import FontAwesome from "react-native-vector-icons/FontAwesome";

//hooks
import { useFetchEvents } from "@/hooks/useFetchEvents";

//components
import Header from "@/components/Header";
import Title from "@/components/Title";
import BoldText from "@/components/BoldText";

const LocationScreen = ({ navigation, route }) => {
	const { locationId } = route.params;
	const currentLocation = eventLocations.find((location) => location.id === locationId);
	const { events, loading, error } = useFetchEvents(locationId);

	/* useFocusEffect(
		React.useCallback(() => {
			navigation.popToTop();

			return () => {
				console.log("Screen is unfocused (blurred)");
			};
		}, [])
	);
 */

	return (
		<SafeAreaView style={styles.screen}>
			<Header variant="2" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.banner}>
					<Image
						source={currentLocation.images[1]}
						style={{ width: "100%", height: "100%", resizeMode: "cover" }}
					/>
				</View>
				<View style={styles.content}>
					<Title style={styles.mainTitle}>{currentLocation.name}</Title>
					{currentLocation.info && (
						<View style={styles.info}>
							{Object.entries(currentLocation.info).map(([key, value]) => (
								<Text style={styles.infoText} key={key}>
									{value}
								</Text>
							))}
						</View>
					)}
					<View style={styles.eventsSection}>
						<Title style={[styles.title]}>Evenimente</Title>

						{error && <Text style={styles.infoText}>Error: {error.message}</Text>}
						{loading ? (
							<ActivityIndicator color="#007AFF" />
						) : events.length > 0 ? (
							<FlatList
								contentContainerStyle={styles.eventList}
								data={events}
								scrollEnabled={false}
								keyExtractor={(item) => item.id_event}
								renderItem={({ item, index }) => (
									<Ripple
										onPress={() =>
											navigation.navigate("EventDetailsScreen", {
												params: {
													locationId: locationId,
													eventId: item.id_event,
												},
											})
										}
										style={styles.eventList_item}
										rippleColor="white"
										rippleDuration={320}
										rippleCentered={false}
									>
										<ImageBackground
											source={{ uri: encodeURI(item.event_img) }}
											// resizeMethod={'auto'}
											style={{
												width: "100%",
												height: "100%",
												backgroundColor: "#000",

												position: "absolute",
												bottom: 0,
											}}
											imageStyle={{
												resizeMode: "cover",
												alignSelf: "flex-end",
												position: "absolute",
												top: 45,
												height: 520,
											}}
										>
											<Text style={styles.eventItem_title}>{item.title}</Text>
											<Text style={styles.eventItem_badge}>
												{formatDateToRomanian(item.date.split(" ")[0])}
											</Text>
										</ImageBackground>
									</Ripple>
								)}
							></FlatList>
						) : (
							<Text style={styles.notFoundText}>
								<FontAwesome name="calendar-o" size={18} color={Colors.primary} />
								{"  "}
								Nu au fost găsite evenimente disponibile pentru această locație.
							</Text>
						)}
					</View>
					{currentLocation.description && (
						<View style={styles.description}>
							<Title style={[styles.title]}>Informatii suplimentare</Title>
							<Text style={styles.descriptionText}>{currentLocation.description}</Text>
						</View>
					)}
					{currentLocation.contactInfo && (
						<View style={styles.contactInfo}>
							<Text style={styles.descriptionText}>
								<BoldText>Date de contact:</BoldText> {currentLocation.contactInfo.name}
								{"\n"}
								<BoldText>Telefon:</BoldText> {currentLocation.contactInfo.phone}
								{"\n"}
								<BoldText>E-mail:</BoldText> {currentLocation.contactInfo.email}
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
		position: "relative",
	},

	banner: {
		position: "relative",
		maxHeight: 340,
	},

	content: {
		flex: 1,
		borderRadius: 21,
		backgroundColor: "white",
		marginTop: -35,
		backgroundColor: Colors["light"].background.primary,
		padding: 20,
	},

	mainTitle: {
		marginTop: 7,
		paddingInline: 15,
		borderBottomWidth: 1,
		borderColor: "#d3d2d2bd",
		paddingBottom: 25,
		fontSize: 22,
		fontWeight: 500,
	},

	title: {
		padding: 0,
		fontWeight: 500,
		fontSize: 20,
		textAlign: "left",
	},

	info: {
		marginTop: 5,
		gap: 15,
	},

	infoText: {
		fontSize: 16,
		lineHeight: 22,
	},

	eventsSection: {
		marginBlock: 20,
		gap: 0,
	},

	eventList_item: {
		aspectRatio: 100 / 120,
		overflow: "hidden",
		width: "100%",
		position: "relative",
		borderRadius: 10,
	},

	eventItem_title: {
		fontSize: 18,
		fontWeight: 500,
		backgroundColor: "white",
		padding: 10,
		textAlign: "center",
	},

	eventItem_badge: {},

	eventItem_image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},

	notFoundText: {
		fontSize: 16,
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		lineHeight: 22,
	},

	description: {
		gap: 0,
	},

	descriptionText: {
		fontSize: 16,
		margin: 0,
		padding: 0,
		lineHeight: 22,
	},

	contactInfo: {
		marginTop: 20,
	},
});

export default LocationScreen;
