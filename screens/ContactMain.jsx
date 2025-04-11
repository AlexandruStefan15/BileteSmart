import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "@/components/Header";

const ContactMain = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Contact Main</Text>
			<Text>Phone: 123-456-7890</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ContactMain;
