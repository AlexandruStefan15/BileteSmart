import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//data
import { ticketingData } from "@/data/ticketing";

//components
import Header from "@/components/Header";

const TicketingScreen = () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Ticketing"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 55, paddingBlock: 50 }}>
				<View style={[styles.section, section1Styles.section]}>
					<View style={section1Styles.container}>
						<Text style={section1Styles.title}>{ticketingData.title}</Text>
						<Text style={section1Styles.story}>{ticketingData.story}</Text>
					</View>
				</View>
				<View style={[styles.section, section2Styles.section]}>
					<View style={section2Styles.container}>
						{ticketingData.images.map((imageURL, index) => (
							<Image
								key={index}
								source={{ uri: encodeURI(imageURL) }}
								style={section2Styles.image}
								resizeMode="cover"
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},

	section: {},
});

const section1Styles = StyleSheet.create({
	container: {
		gap: 5,
		alignItems: "center",
		paddingInline: 21,
	},

	title: {
		fontSize: 21,
		fontWeight: "bold",
		marginBottom: 30,
	},

	story: {
		textAlign: "center",
		fontSize: 16,
		lineHeight: 24,
	},
});

const section2Styles = StyleSheet.create({
	container: {
		gap: 25,
		alignItems: "center",
		paddingInline: 21,
	},

	image: {
		width: "100%",
		aspectRatio: 1 / 1,
		borderRadius: 8,
	},
});

export default TicketingScreen;
