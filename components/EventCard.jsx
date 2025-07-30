import React, { useContext } from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

//constants
import { Colors } from "@/constants";

//utils
import { formatDate } from "@/utils/helpers";

//images
import { images } from "@/assets/images/index";

//hooks
import { useCustomFonts } from "@/hooks/useCustomFonts";

//components
import Ripple from "react-native-material-ripple";

export default function EventCard({ eventData, style, variant = "", ...props }) {
	const fonts = useCustomFonts();
	const styles = getStyles("light");

	if (!fonts) return null;

	if (variant == 2)
		return (
			<View>
				<Ripple
					style={[styles.container2, style]}
					rippleColor="white"
					rippleDuration={320}
					rippleCentered={false}
					{...props}
				>
					<ImageBackground
						source={{ uri: encodeURI(eventData.event_img) }}
						imageStyle={styles.image2}
					>
						{/* <View style={styles.event_badge}>
							{formatDate(eventData.date)
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
						</View> */}
					</ImageBackground>
				</Ripple>
				<Text style={styles.title2}>{eventData.title}</Text>
				<View style={styles.subtitleWrapper2}>
					<Image style={styles.subtitleIcon2} source={images.schedule}></Image>
					<Text style={styles.subtitle2}>
						{eventData.date} | {eventData.time}
					</Text>
				</View>
			</View>
		);

	return (
		<Ripple
			style={[styles.container, style]}
			rippleColor="white"
			rippleDuration={320}
			rippleCentered={false}
			{...props}
		>
			<ImageBackground source={{ uri: encodeURI(eventData.event_img) }} imageStyle={styles.image}>
				<Text style={styles.title}>{eventData.title}</Text>
				<View style={styles.badge}>
					{formatDate(eventData.date)
						.trim()
						.split(" ")
						.map((word, index) => (
							<Text style={[styles[`badge_text`], styles[`badge_text${index}`]]} key={index}>
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
		container: {
			aspectRatio: 100 / 130,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 10,
			borderWidth: 1.3,
			borderColor: "#dedede5e",
		},

		title: {
			fontSize: 15,
			fontWeight: 500,
			backgroundColor: "white",
			padding: 11,
			textAlign: "center",
		},

		badge: {
			backgroundColor: "#242424d6",
			paddingInline: 18,
			paddingTop: 7.5,
			paddingBottom: 13,
			textAlign: "center",
			position: "relative",
			top: 1,
			left: 11,
			minWidth: 70,
			alignSelf: "flex-start",
		},

		badge_text: {
			fontSize: 14,
			fontWeight: 400,
			color: "white",
			textAlign: "center",
			fontWeight: "500",
		},

		badge_text0: {
			fontSize: 25,
			fontWeight: "bold",
			marginBottom: -3,
		},

		image: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 44,
			height: 520,
		},

		//variant 2

		container2: {
			aspectRatio: 100 / 64,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 13,
			borderWidth: 1.3,
			borderColor: "#dedede5e",
		},

		image2: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 0,
			height: 520,
		},

		title2: {
			fontSize: 14.5,
			fontWeight: 600,
			marginLeft: 2,
			marginTop: 5,
			fontFamily: "Poppins-SemiBold",
		},

		subtitleWrapper2: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
			marginLeft: 2,
		},

		subtitle2: {
			fontSize: 13.7,
			color: Colors.secondary,
			fontWeight: 500,
			marginLeft: 2,
			marginBottom: 5,
			lineHeight: 16.5,
			textAlign: "left",
			fontStyle: "normal",
			letterSpacing: 0.2,
		},

		subtitleIcon2: {
			width: 20,
			height: 20,
			top: -2.3,
		},
	});
};
