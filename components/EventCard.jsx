import React, { useContext } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors, Fonts } from "@/constants";
import { ThemeContext } from "@/context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

//utils
import { formatDateToRomanian } from "@/utils/helpers";

//components
import Ripple from "react-native-material-ripple";

export default function EventCard({ eventData, locationId, style }) {
	const { isDark, theme, setTheme } = useContext(ThemeContext);
	const styles = getStyles("light");
	const navigation = useNavigation();

	return (
		<Ripple
			onPress={() =>
				navigation.navigate("EventDetailsScreen", {
					params: {
						locationId: locationId,
						eventId: eventData.id_event,
					},
				})
			}
			style={[styles.event_container, style]}
			rippleColor="white"
			rippleDuration={320}
			rippleCentered={false}
		>
			<ImageBackground
				source={{ uri: encodeURI(eventData.event_img) }}
				imageStyle={styles.event_image}
			>
				<Text style={styles.event_title}>{eventData.title}</Text>
				<View style={styles.event_badge}>
					{formatDateToRomanian(eventData.date.split(" ")[0])
						.trim()
						.split(" ")
						.map((word, index) => (
							<Text
								style={[styles[`event_badge_text`], styles[`event_badge_text${index}`]]}
								key={index}
							>
								{word}
							</Text>
						))}
				</View>
			</ImageBackground>
		</Ripple>
	);
}

const getStyles = (theme) => {
	return StyleSheet.create({
		event_container: {
			aspectRatio: 100 / 120,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 10,
		},

		event_title: {
			fontSize: 18,
			fontWeight: 500,
			backgroundColor: "white",
			padding: 10,
			textAlign: "center",
		},

		event_badge: {
			backgroundColor: "#242424cc",
			paddingInline: 20,
			paddingTop: 8,
			paddingBottom: 12,
			textAlign: "center",
			position: "absolute",
			top: 45.5,
			left: 10,
			minWidth: 77,
		},

		event_badge_text: {
			fontSize: 14,
			fontWeight: 400,
			color: "white",
			textAlign: "center",
		},

		event_badge_text0: {
			fontSize: 30,
			fontWeight: "bold",
			marginBottom: -3,
		},

		/* eventItem_imageBox: {
			width: "100%",
			height: "100%",
			backgroundColor: "#000",
			position: "absolute",
			bottom: 0,
		}, */

		event_image: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 45,
			height: 520,
		},
	});
};
