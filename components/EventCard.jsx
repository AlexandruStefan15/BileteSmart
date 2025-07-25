import React, { useContext } from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

//utils
import { formatDate } from "@/utils/helpers";

//images
import { images } from "@/assets/images/index";

//components
import Ripple from "react-native-material-ripple";

export default function EventCard({ eventData, style, variant = "", ...props }) {
	const styles = getStyles("light");

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
			aspectRatio: 100 / 65,
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
			fontSize: 15,
			fontWeight: 600,
			marginLeft: 2,
			marginTop: 4.5,
		},

		subtitleWrapper2: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
			marginLeft: 2,
		},

		subtitleIcon2: {
			width: 19,
			height: 19,
			top: -1,
		},

		subtitle2: {
			fontSize: 14,
			color: "#848383",
			fontWeight: 500,
			marginLeft: 2,
			marginBottom: 5,
			marginTop: 2,
			textAlign: "left",
			/* fontFamily: Fonts["light"].regular, */
			fontStyle: "normal",
			letterSpacing: 0.2,
		},
	});
};
