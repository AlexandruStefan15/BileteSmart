import React, { useContext } from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import { Colors, Fonts } from "@/constants";
import { useNavigation } from "@react-navigation/native";

//utils
import { formatDate } from "@/utils/helpers";

//images
import { images } from "@/assets/images/index";

//components
import Ripple from "react-native-material-ripple";

export default function EventCard({ eventData, style, variant = "", ...props }) {
	const styles = getStyles("light");
	const navigation = useNavigation();

	if (variant == 2)
		return (
			<View>
				<Ripple
					style={[styles.event_container2, style]}
					rippleColor="white"
					rippleDuration={320}
					rippleCentered={false}
					{...props}
				>
					<ImageBackground
						source={{ uri: encodeURI(eventData.event_img) }}
						imageStyle={styles.event_image2}
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
				<Text style={styles.event_title2}>{eventData.title}</Text>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
					<Image style={{ width: 19, height: 19, top: -1 }} source={images.clock}></Image>
					<Text style={styles.event_subtitle2}>
						{eventData.date} | {eventData.time}
					</Text>
				</View>
			</View>
		);

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
				</View>
			</ImageBackground>
		</Ripple>
	);
}

const getStyles = (theme) => {
	return StyleSheet.create({
		event_container: {
			aspectRatio: 100 / 130,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 10,
			borderWidth: 1.3,
			borderColor: "#dedede5e",
		},

		event_title: {
			fontSize: 15,
			fontWeight: 500,
			backgroundColor: "white",
			padding: 11,
			textAlign: "center",
		},

		event_badge: {
			backgroundColor: "#242424d6",
			paddingInline: 18,
			paddingTop: 7.5,
			paddingBottom: 13,
			textAlign: "center",
			position: "relative",
			top: 0,
			left: 11,
			minWidth: 70,
			alignSelf: "flex-start",
		},

		event_badge_text: {
			fontSize: 14,
			fontWeight: 400,
			color: "white",
			textAlign: "center",
			fontWeight: "500",
		},

		event_badge_text0: {
			fontSize: 25,
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

		//variant 2

		event_container2: {
			aspectRatio: 100 / 65,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 13,
			borderWidth: 1.3,
			borderColor: "#dedede5e",
		},

		event_image2: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 0,
			height: 520,
		},

		event_title2: {
			fontSize: 15,
			fontWeight: 600,
			marginLeft: 2,
			marginTop: 4.5,
		},

		event_subtitle2: {
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
