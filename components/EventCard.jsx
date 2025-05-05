import React, { useContext } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors, Fonts } from "@/constants";
import { useNavigation } from "@react-navigation/native";

//utils
import { formatDateToRomanian } from "@/utils/helpers";

//components
import Ripple from "react-native-material-ripple";

export default function EventCard({ eventData, style, ...props }) {
	const styles = getStyles("light");
	const navigation = useNavigation();

	return (
		<Ripple
			style={[styles.event_container, style]}
			rippleColor="white"
			rippleDuration={320}
			rippleCentered={false}
			{...props}
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
			borderWidth: 1,
			borderColor: "#dadada57",
		},

		event_title: {
			fontSize: 16,
			fontWeight: 500,
			backgroundColor: "white",
			padding: 11,
			textAlign: "center",
		},

		event_badge: {
			backgroundColor: "#242424cc",
			paddingInline: 20,
			paddingTop: 6,
			paddingBottom: 12,
			textAlign: "center",
			position: "relative",
			top: 0,
			left: 11,
			minWidth: 75,
			width: 40,
		},

		event_badge_text: {
			fontSize: 14,
			fontWeight: 400,
			color: "white",
			textAlign: "center",
			fontWeight: "500",
		},

		event_badge_text0: {
			fontSize: 30,
			fontWeight: "bold",
			marginBottom: -3,
		},

		event_image: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 44,
			height: 520,
		},
	});
};
