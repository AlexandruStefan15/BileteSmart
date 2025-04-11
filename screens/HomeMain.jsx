import React from "react";
import { View, Text, Button, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";

export default function HomeMain({ navigation }) {
	return (
		<SafeAreaView>
			<ScrollView>
				<Header title="Home" />
			</ScrollView>
		</SafeAreaView>
	);
}
