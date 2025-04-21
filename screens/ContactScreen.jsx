import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Header from "@/components/Header";

const ContactScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Contact Main</Text>
			<Text>Phone: 123-456-7890</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default ContactScreen;
