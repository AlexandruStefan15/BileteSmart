import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";
import { Colors } from "@/constants";
import { ThemeContext } from "@react-navigation/native";

export default function HomeMain({ navigation }) {
	const { theme } = useContext(ThemeContext);
	const styles = getStyles(theme || "light");

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Header title="Home" />
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
