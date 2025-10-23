import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//constants
import { Colors } from "@/constants";

//utils
import { formatDate } from "@/utils/helpers";
import { formatRomanianDate } from "@/utils/helpers";

//images
import { images } from "@/assets/images/index";

//svgs
import CalendarIcon from "@/assets/svgs/calendar.svg";
import MapPinIcon from "@/assets/svgs/mapPin.svg";

//hooks
import { useCustomFonts } from "@/hooks/useCustomFonts";

//components
import Ripple from "react-native-material-ripple";
import Icon from "./Icon";

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
			<Pressable style={styles.container} onLayout={onCardLayout} {...props}>
				<View style={[styles.imageBox, style]}>
					<ImageBackground
						source={{ uri: encodeURI(eventData.eventCard_img) }}
						imageStyle={styles.image}
					/>
					<LinearGradient
						colors={["#00000008", "#0e0e0e01"]}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
						style={styles.gradientOverlay}
					/>
				</View>
				<View style={styles.footer}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
						{eventData.title}
					</Text>
					<View style={styles.subtitle}>
						<View style={styles.subtitle_item}>
							<CalendarIcon style={styles.subtitleIcon} width={17} />
							<Text style={styles.subtitle_text}>
								{formatRomanianDate(eventData.date, true)} | {eventData.time}
							</Text>
						</View>
						<View style={styles.subtitle_item}>
							<Icon style={styles.subtitleIcon} lib="fe" name="map-pin" size={16.5} color="#555" />
							<Text style={styles.subtitle_text}>{eventData.location}</Text>
						</View>
					</View>
				</View>
			</Pressable>
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
				<View style={styles.badge}>
					{formatDate(eventData.date, "short")
						.trim()
						.split(" ")
						.map((word, index) => (
							<Text style={[styles[`badge_text`], styles[`badge_text${index}`]]} key={index}>
								{word}
							</Text>
						))}
				</View>
				<LinearGradient
					colors={["#000000ff", "#0e0e0ec6", "#0e0e0e06", "#0e0e0e06", "#0e0e0e06", "#00000005"]}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
					style={styles.gradientOverlay}
				>
					<Text style={[styles.title, { marginBottom: 10 }]} numberOfLines={2} ellipsizeMode="tail">
						{eventData.title}
					</Text>
				</LinearGradient>
			</ImageBackground>
		</Ripple>
	);
}

const getStyles = (theme, variant, cardHeight) => {
	if (variant == "2")
		return StyleSheet.create({
			container: {
				boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
				overflow: "hidden",
				borderRadius: 10,
			},

			imageBox: {
				aspectRatio: 100 / 50,
				overflow: "hidden",
				width: "100%",
				position: "relative",
				borderBottomRightRadius: 0,
				borderBottomLeftRadius: 0,
			},

			image: {
				resizeMode: "cover",
				position: "absolute",
				top: 0,
				height: cardHeight + 107,
			},

			footer: {
				gap: 3.7,
				paddingBlock: 7.5,
				paddingBottom: 8,
				paddingTop: 6.5,
				paddingInline: 11,
				backgroundColor: "white",
			},

			title: {
				fontSize: 15.2,
				marginLeft: 2.5,
				marginBottom: 2.5,
				marginTop: 2,
				fontWeight: "700",
				lineHeight: 27,
			},

			subtitle: {
				marginRight: "auto",
				alignItems: "flex-start",
				gap: 8,
				marginLeft: 2,
			},

			subtitle_item: {
				flexDirection: "row",
				gap: 4,
				alignItems: "center",
			},

			subtitleIcon: {
				marginTop: -6.5,
				marginRight: 1,
			},

			subtitle_text: {
				fontSize: 13.2,
				color: "#555",
				fontWeight: 500,
				marginLeft: 2,
				bottom: 2.5,
				lineHeight: 17,
				textAlign: "left",
				fontStyle: "normal",
				letterSpacing: 0.2,
			},

			gradientOverlay: {
				zIndex: 9999,
				height: "100%",
			},
		});

	return StyleSheet.create({
		container: {
			aspectRatio: 100 / 125,
			overflow: "hidden",
			width: "100%",
			position: "relative",
			borderRadius: 10,
			borderBottomWidth: 1.2,
			borderColor: "rgba(0, 0, 0, 0.19)",
			boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.34)",
		},

		title: {
			fontSize: 16.5,
			fontWeight: 600,
			padding: 11,
			textAlign: "left",
			marginTop: "auto",
			color: "white",
			marginLeft: 2,
			fontFamily: "Poppins-SemiBold",
		},

		badge: {
			position: "absolute",
			backgroundColor: "white",
			textAlign: "center",
			top: 13,
			left: 13,
			minWidth: 58,
			alignSelf: "flex-start",
			borderRadius: 12,
			justifyContent: "center",
			alignItems: "center",
			overflow: "hidden",
			boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.34)",
		},

		badge_text: {
			fontSize: 14,
			fontWeight: 400,
			color: "#1a75cf",
			textAlign: "center",
			fontWeight: "500",
			paddingInline: 12,
		},

		badge_text0: {
			fontSize: 22.5,
			fontWeight: "bold",
			marginBottom: 0,
			width: "100%",
			paddingVertical: 2,
			paddingTop: 2.5,
		},

		badge_text1: {
			paddingVertical: 5,
			backgroundColor: "#e7f0fe",
			width: "100%",
			fontWeight: "800",
			fontSize: 11.5,
		},

		badge_text2: {
			display: "none",
		},

		image: {
			resizeMode: "cover",
			alignSelf: "flex-end",
			position: "absolute",
			top: 0,
			flex: 1,
			height: 560,
		},

		gradientOverlay: {
			height: "101%",
		},
	});
};
