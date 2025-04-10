import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "@/constants";
import { ThemeContext } from "@/Context/ThemeContext";

export default function EventCard({ event, style, ...props }) {
	const { isDark, theme, setTheme } = useContext(ThemeContext);
	const styles = getStyles(theme || "light");
	const router = useRouter();

	return (
		<View style={[styles.container, style?.container]}>
			<Text style={styles.title}>{event.title}</Text>
			<Image style={styles.image} source={event.image} />
			<View style={styles.linksContainer}>
				<TouchableOpacity style={styles.button} onPress={() => router.push("/chart")}>
					<Text style={styles.buttonText}>Rezerva acum</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Detalii</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const getStyles = (theme) => {
	return StyleSheet.create({
		container: {
			gap: 10,
			paddingInline: 20,
		},

		title: {
			fontSize: 17,
			color: Colors[theme].text.primary,
			fontWeight: 500,
		},

		text: {
			fontSize: 17.5,
			color: Colors[theme].text.primary,
		},

		image: {
			width: "100%",
			height: undefined,
			resizeMode: "cover",
			marginInline: "auto",
			borderRadius: 10,
			aspectRatio: 15.5 / 9,
		},

		button: {
			backgroundColor: "#0a7ea4",
			color: "white",
			padding: 10,
			borderRadius: 6,
			textAlign: "center",
			marginInline: "auto",
			alignSelf: "flex-start",
			flex: 1,
		},

		buttonText: {
			color: "white",
			fontWeight: "bold",
			textAlign: "center",
			fontSize: 14,
		},

		linksContainer: {
			flexDirection: "row-reverse",
			gap: 10,
		},
	});
};
