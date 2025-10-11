import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

//colors
import { Colors } from "@/constants";

//store
import { useDrawerStore } from "@/store/store";

//components
import HeroBanner from "@/components/sections/HeroBanner";
import Locations from "@/components/sections/Locations";
import EventCounters from "@/components/sections/EventCounters";
import Newsletter from "@/components/sections/Newsletter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomeScreen({ navigation }) {
	const { theme } = useContext(ThemeContext);
	const styles = getStyles(theme || "light");

	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			// On focus, close the drawer
			closeDrawer();
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<HeroBanner />
				<Locations />
				<EventCounters />
				<Newsletter />
				<Footer />
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
