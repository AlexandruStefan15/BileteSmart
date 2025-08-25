import React, { useState } from "react";
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
	const [cardHeight, setCardHeight] = useState(0);
	const fonts = useCustomFonts();
	const styles = getStyles("light", variant, cardHeight);

	const onCardLayout = (e) => {
		const h = e.nativeEvent.layout.height;
		setCardHeight(h);
	};

	if (!fonts) return null;

	if (variant == 2)
		return (
			<View onLayout={onCardLayout}>
				<Ripple
					style={[styles.container, style]}
					rippleColor="white"
					rippleDuration={320}
					rippleCentered={false}
					{...props}
				>
					<ImageBackground
						source={{ uri: encodeURI(eventData.eventCard_img) }}
						imageStyle={styles.image}
					/>
				</Ripple>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{eventData.title}
				</Text>
				<View style={styles.subtitle}>
					<View style={styles.subtitle_item}>
						<Image style={styles.subtitleIcon_date} source={images.calendar} />
						<Text style={styles.subtitle_text}>{formatDate(eventData.date, "numeric")}</Text>
					</View>
					<View style={styles.subtitle_item}>
						<Image style={styles.subtitleIcon_clock} source={images.clock} />
						<Text style={styles.subtitle_text}>{eventData.time}</Text>
					</View>
					<View style={styles.subtitle_item}>
						<Image style={styles.subtitleIcon_location} source={images.location} />
						<Text style={styles.subtitle_text}>{eventData.location}</Text>
					</View>
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

const getStyles = (theme, variant, cardHeight) => {
	if (variant == "2")
		return StyleSheet.create({
			container: {
				aspectRatio: 100 / 64,
				overflow: "hidden",
				width: "100%",
				position: "relative",
				borderRadius: 13,
				borderWidth: 1.3,
				borderColor: "#dedede5e",
			},

			image: {
				resizeMode: "cover",
				position: "absolute",
				top: 0,
				height: cardHeight + 16,
			},

			title: {
				fontSize: 14.5,
				fontWeight: 600,
				marginLeft: 2,
				marginTop: 5.2,
				fontFamily: "Poppins-SemiBold",
			},

			subtitle: {
				flexDirection: "row-reverse",
				marginRight: "auto",
				alignItems: "center",
				gap: 12,
				marginLeft: 2,
				marginTop: 0.45,
			},

			subtitle_item: {
				flexDirection: "row",
				gap: 2,
				alignItems: "center",
			},

			subtitleIcon_location: {
				width: 17,
				aspectRatio: 1 / 1,
				marginTop: -5.2,
				marginRight: 0.5,
			},

			subtitleIcon_date: {
				width: 22.5,
				height: 22.5,
				marginTop: -5.5,
				marginRight: -1.7,
			},

			subtitleIcon_clock: {
				width: 17,
				aspectRatio: 1 / 1,
				marginTop: -5.7,
				marginRight: 0.5,
			},

			subtitle_text: {
				fontSize: 13.8,
				color: "#6f6f6fff",
				fontWeight: 500,
				marginLeft: 2,
				marginBottom: 5,
				lineHeight: 17,
				textAlign: "left",
				fontStyle: "normal",
				letterSpacing: 0.2,
			},
		});

	return StyleSheet.create({
		container: {
			aspectRatio: 100 / 130,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 10,
			borderWidth: 1.3,
			borderColor: "#dbdbdb5e",
		},

		title: {
			fontSize: 15,
			fontWeight: 500,
			backgroundColor: "white",
			padding: 11,
			textAlign: "center",
		},

		badge: {
			backgroundColor: "#242424de",
			paddingInline: 18,
			paddingTop: 7.5,
			paddingBottom: 13,
			textAlign: "center",
			position: "relative",
			top: 1.5,
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
	});
};
