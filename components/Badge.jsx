import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

//helpers
import { formatDate } from "@/utils/helpers";

//componets
import Icon from "./Icon";

//store
import { useSavedEventsStore } from "@/store";
import { useLikedLocationsStore } from "@/store";

const Badge = ({ variant = "calendar", data, iconSize = 24, style }) => {
	const { toggleSaveEvent, isEventSaved } = useSavedEventsStore(); // explanation*
	const { toggleLikeLocation, isLocationLiked, likedLocations } = useLikedLocationsStore();
	const styles = getStyles(variant);

	if (variant == "like")
		return (
			<Pressable style={[styles.badge, style]} onPress={() => toggleLikeLocation(data)}>
				<Icon
					style={{ top: 0.75, left: 0.25 }}
					lib="mci"
					name={isLocationLiked(data.id) ? "heart" : "heart-outline"}
					size={iconSize}
					color="red"
				/>
			</Pressable>
		);

	if (variant == "save")
		return (
			<Pressable style={[styles.badge, style]} onPress={() => toggleSaveEvent(data)}>
				<Icon
					lib="mi"
					name={isEventSaved(data.id_event) ? "bookmark" : "bookmark-border"}
					size={iconSize}
					color="white"
				/>
			</Pressable>
		);

	return (
		<View style={[styles.badge, style]}>
			{formatDate(data.date, "short")
				.trim()
				.split(" ")
				.map((word, index) => (
					<Text style={[styles[`badge_text`], styles[`badge_text${index}`]]} key={index}>
						{word}
					</Text>
				))}
		</View>
	);
};

const getStyles = (variant) => {
	if (variant == "like")
		return StyleSheet.create({
			badge: {
				position: "absolute",
				zIndex: 99,
				right: 12,
				top: 12,
				backgroundColor: "#0000008e",
				paddingInline: 8,
				paddingBlock: 7.5,
				borderRadius: 50,
			},
		});

	if (variant == "save")
		return StyleSheet.create({
			badge: {
				position: "absolute",
				zIndex: 99,
				right: 10,
				top: 10,
				backgroundColor: "#000000c1",
				paddingInline: 8,
				paddingBlock: 8,
				borderRadius: 60,
			},
		});

	return StyleSheet.create({
		badge: {
			position: "absolute",
			backgroundColor: "white",
			textAlign: "center",
			top: 12,
			left: 12,
			minWidth: 58,
			alignSelf: "flex-start",
			borderRadius: 11,
			justifyContent: "center",
			alignItems: "center",
			overflow: "hidden",
			boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.68)",
			minWidth: 60,
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
			paddingTop: 3,
		},

		badge_text1: {
			paddingVertical: 5.2,
			backgroundColor: "#e7f0fe",
			width: "100%",
			fontWeight: "800",
			fontSize: 11.5,
		},

		badge_text2: {
			display: "none",
		},
	});
};

export default Badge;

/* 
explanation* 

using:
const toggleSaveEvent = useSavedEventsStore((s) => s.toggleSaveEvent);
const isEventSaved = useSavedEventsStore((s) => s.isEventSaved);

Here, you’re creating two separate subscriptions to the store — one for each selector.
That’s usually fine if those functions don’t depend on each other’s internal state.

However:
isEventSaved() uses get().savedEvents inside the store definition.
When toggleSaveEvent() updates savedEvents, it may not trigger a re-render in components that use only functions as selectors (since Zustand re-renders based on shallow state equality).
So your component doesn’t re-render — meaning the icon never updates, even though the data inside the store changes correctly.

solution: const { toggleSaveEvent, isEventSaved } = useSavedEventsStore();

Here, you’re subscribing to the entire store, so every time anything changes (including savedEvents), your component re-renders — and thus, the icon updates properly.

That’s why it “works” even though it’s less performant (more frequent re-renders). 
*/
