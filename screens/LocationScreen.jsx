import React from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Text,
	Image,
	FlatList,
	ActivityIndicator,
	StatusBar,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants";
import { images } from "@/assets/images";

//data
import { eventsByLocation } from "@/data/events"; // to be fetched

//icons
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

//hooks
import { useFetchEventsByLocation } from "@/hooks/useFetchEventsByLocation";

//components
import Header from "@/components/Header";
import Title from "@/components/Title";
import BoldText from "@/components/BoldText";
import EventCard from "@/components/EventCard";
import ImageGallery from "@/components/ImageGallery";
import LocationMap from "@/components/LocationMap";

const LocationScreen = ({ navigation, route }) => {
	const { currentLocation } = route.params;
	/* const { events, loading, error } = useFetchEventsByLocation(currentLocation.id); */
	const events = eventsByLocation[currentLocation.id]; // to be fetched like above
	const loading = !events; // Simulating loading state
	const error = null; // Simulating no error state

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Header variant="2" />
				<View style={styles.banner}>
					<Image
						source={currentLocation.images.banner}
						style={{ width: "100%", height: "100%", resizeMode: "cover" }}
					/>
				</View>
				<View style={styles.content}>
					<Title style={styles.mainTitle}>{currentLocation.name}</Title>
					{currentLocation.info && (
						<View style={styles.info}>
							{Object.entries(currentLocation.info).map(([key, value]) => (
								<Text style={[styles.infoText]} key={key}>
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
									<EventCard
										eventData={item}
										onPress={() =>
											navigation.navigate("EventDetailsStack", {
												screen: "EventDetailsScreen",
												params: {
													locationId: currentLocation.id,
													event: item,
													currentLocation,
												},
											})
										}
									/>
								)}
							/>
						) : (
							<Text style={styles.notFoundText}>
								<FontAwesomeIcon name="calendar-o" size={18} color={Colors.primary} />
								{"  "}
								Nu au fost găsite evenimente disponibile pentru această locație încă.
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
					{currentLocation.galleryImages?.length > 0 && (
						<View style={styles.photoGallery}>
							<Title style={[styles.title]}>Galerie foto</Title>
							<ImageGallery
								images={currentLocation.galleryImages}
								onPressImage={() =>
									navigation.navigate("GalleryScreen", {
										images: currentLocation.galleryImages,
									})
								}
							/>
						</View>
					)}
					<View style={styles.address_section}>
						<Title style={[styles.title]}>Adresa locatiei</Title>
						<Pressable
							style={styles.adressContainer}
							onPress={() =>
								navigation.navigate("LocationMapScreen", {
									coordinates: currentLocation.coordinates,
									address: currentLocation.address,
								})
							}
						>
							<LocationMap
								styleContainer={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
								coordinates={currentLocation.coordinates}
								options={{
									scrollEnabled: false,
									zoomEnabled: false,
									rotateEnabled: false,
									pitchEnabled: false,
								}}
							/>
							<View style={styles.addressWrapper}>
								<Image style={styles.address_icon} source={images.pin} />
								<Text style={styles.address_text}>{currentLocation.address}</Text>
							</View>
						</Pressable>
					</View>
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
		marginBottom: 5,
	},

	mainTitle: {
		marginTop: 7,
		paddingInline: 15,
		borderBottomWidth: 1,
		borderColor: "#d3d2d2bd",
		paddingBottom: 25,
		fontSize: 22,
		fontWeight: 600,
	},

	title: {
		padding: 0,
		fontWeight: 600,
		fontSize: 20,
		textAlign: "left",
		marginBottom: 16,
	},

	info: {
		marginTop: 6,
		gap: 15.5,
	},

	infoText: {
		fontSize: 16,
		lineHeight: 22,
	},

	eventsSection: {
		marginTop: 12,
		marginBottom: 7,
		gap: 0,
	},

	eventList: {
		paddingBlock: 5,
		gap: 25,
	},

	notFoundText: {
		fontSize: 16,
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		lineHeight: 22,
		fontWeight: 400,
		borderWidth: 1.1,
		borderColor: "#dbdbdb5e",
	},

	description: {
		gap: 0,
	},

	descriptionText: {
		fontSize: 16,
		margin: 0,
		padding: 0,
		lineHeight: 22,
		marginTop: -3,
	},

	contactInfo: {
		marginTop: 20,
	},

	photoGallery: {
		marginTop: 12,
	},

	address_section: {
		marginTop: 12,
	},

	adressContainer: {
		outlineWidth: 1.1,
		outlineColor: "#dbdbdb5e",
		outlineStyle: "solid",
		borderRadius: 10,
		overflow: "hidden",
		boxShadow: "0px 0px 1.75px rgba(0, 0, 0, 0.27)",
	},

	addressWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderTopWidth: 0,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},

	address_icon: {
		width: 33,
		height: 33,
	},

	address_text: {
		flex: 1,
		fontSize: 14.5,
		fontWeight: "500",
		lineHeight: 22,
	},
});

export default LocationScreen;
