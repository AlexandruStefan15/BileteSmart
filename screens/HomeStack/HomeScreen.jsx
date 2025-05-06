import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants";
import { ThemeContext } from "@react-navigation/native";

import HeroBanner from "@/components/sections/HeroBanner";
import Locations from "@/components/sections/Locations";
import EventCounters from "@/components/sections/EventCounters";
import Newsletter from "@/components/sections/Newsletter";

export default function HomeScreen({ navigation }) {
	const { theme } = useContext(ThemeContext);
	const styles = getStyles(theme || "light");

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<HeroBanner />
				<Locations />
				<EventCounters />
				<Newsletter />
			</ScrollView>
		</SafeAreaView>
	);
}

const getStyles = (theme) =>
	StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: Colors[theme].background.primary,
		},
	});
